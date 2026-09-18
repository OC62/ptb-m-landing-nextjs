import { createHmac } from 'node:crypto';

export const CONTACT_RATE_LIMIT = Object.freeze({
  limit: 60,
  windowMs: 60_000,
  timeoutMs: 1_500,
  keyPrefix: 'ptb-m:contact',
});

const RATE_LIMIT_SCRIPT = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
return count
`.trim();

function getRateLimitConfig(env) {
  const endpointValue = (
    env?.UPSTASH_REDIS_REST_URL?.trim()
    || env?.KV_REST_API_URL?.trim()
  );
  const token = (
    env?.UPSTASH_REDIS_REST_TOKEN?.trim()
    || env?.KV_REST_API_TOKEN?.trim()
  );
  const hmacSecret = env?.RATE_LIMIT_HMAC_SECRET?.trim();

  if (!endpointValue || !token || !hmacSecret || hmacSecret.length < 32) {
    return null;
  }

  let endpoint;

  try {
    endpoint = new URL(endpointValue);
  } catch {
    return null;
  }

  if (endpoint.protocol !== 'https:') {
    return null;
  }

  endpoint.pathname = endpoint.pathname.replace(/\/+$/, '');
  endpoint.search = '';
  endpoint.hash = '';

  return {
    endpoint: endpoint.toString().replace(/\/$/, ''),
    token,
    hmacSecret,
  };
}

export function createContactRateLimitIdentifier({ ip, secret }) {
  if (
    typeof ip !== 'string'
    || ip.trim() === ''
    || typeof secret !== 'string'
    || secret.length < 32
  ) {
    return '';
  }

  return createHmac('sha256', secret)
    .update(`contact:${ip.trim()}`)
    .digest('hex');
}

export async function checkContactRateLimit({
  ip,
  env = process.env,
  fetchImpl = globalThis.fetch,
  now = Date.now,
  timeoutMs = CONTACT_RATE_LIMIT.timeoutMs,
} = {}) {
  if (typeof ip !== 'string' || ip.trim() === '') {
    return { ok: false, reason: 'client-ip' };
  }

  const config = getRateLimitConfig(env);

  if (!config) {
    return { ok: false, reason: 'configuration' };
  }

  if (typeof fetchImpl !== 'function') {
    return { ok: false, reason: 'configuration' };
  }

  const nowMs = Number(now());

  if (!Number.isFinite(nowMs) || nowMs < 0) {
    return { ok: false, reason: 'configuration' };
  }

  const windowNumber = Math.floor(nowMs / CONTACT_RATE_LIMIT.windowMs);
  const reset = (windowNumber + 1) * CONTACT_RATE_LIMIT.windowMs;

  const identifier = createContactRateLimitIdentifier({
    ip,
    secret: config.hmacSecret,
  });

  if (!identifier) {
    return { ok: false, reason: 'configuration' };
  }

  const key = `${CONTACT_RATE_LIMIT.keyPrefix}:${windowNumber}:${identifier}`;

  // The key includes the window number, so retaining it for two windows is
  // sufficient for cleanup without affecting the next fixed window.
  const ttlMs = CONTACT_RATE_LIMIT.windowMs * 2;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response;

  try {
    response = await fetchImpl(config.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL',
        RATE_LIMIT_SCRIPT,
        1,
        key,
        ttlMs,
      ]),
      cache: 'no-store',
      signal: controller.signal,
    });
  } catch (error) {
    return {
      ok: false,
      reason: error?.name === 'AbortError' ? 'timeout' : 'unavailable',
    };
  } finally {
    clearTimeout(timer);
  }

  if (!response?.ok) {
    return {
      ok: false,
      reason: 'unavailable',
      upstreamStatus: response?.status ?? null,
    };
  }

  let data;

  try {
    data = await response.json();
  } catch {
    return { ok: false, reason: 'unavailable' };
  }

  if (
    data?.error
    || !Number.isInteger(data?.result)
    || data.result < 1
  ) {
    return { ok: false, reason: 'unavailable' };
  }

  const count = data.result;
  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((reset - nowMs) / 1000),
  );

  if (count > CONTACT_RATE_LIMIT.limit) {
    return {
      ok: false,
      reason: 'limited',
      limit: CONTACT_RATE_LIMIT.limit,
      remaining: 0,
      reset,
      retryAfterSeconds,
    };
  }

  return {
    ok: true,
    limit: CONTACT_RATE_LIMIT.limit,
    remaining: CONTACT_RATE_LIMIT.limit - count,
    reset,
  };
}
