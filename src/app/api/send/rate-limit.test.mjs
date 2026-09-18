import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CONTACT_RATE_LIMIT,
  checkContactRateLimit,
  createContactRateLimitIdentifier,
} from './rate-limit.mjs';

const validEnv = () => ({
  UPSTASH_REDIS_REST_URL: 'https://example.upstash.io',
  UPSTASH_REDIS_REST_TOKEN: 'redis-token',
  RATE_LIMIT_HMAC_SECRET: 'a'.repeat(64),
});

function responseWith(result, options = {}) {
  return {
    ok: options.ok ?? true,
    status: options.status ?? 200,
    async json() {
      if (options.jsonError) {
        throw new Error('invalid json');
      }

      return result;
    },
  };
}

test('creates a stable HMAC identifier without exposing the raw IP', () => {
  const ip = '203.0.113.10';
  const secret = 'a'.repeat(64);

  const first = createContactRateLimitIdentifier({ ip, secret });
  const second = createContactRateLimitIdentifier({ ip, secret });

  assert.equal(first, second);
  assert.equal(first.length, 64);
  assert.equal(first.includes(ip), false);

  assert.notEqual(
    first,
    createContactRateLimitIdentifier({
      ip,
      secret: 'b'.repeat(64),
    }),
  );
});

test('fails closed when client IP is unavailable', async () => {
  const result = await checkContactRateLimit({
    ip: '',
    env: validEnv(),
  });

  assert.deepEqual(result, {
    ok: false,
    reason: 'client-ip',
  });
});

test('fails closed when configuration is missing or unsafe', async () => {
  for (const env of [
    {},
    {
      ...validEnv(),
      UPSTASH_REDIS_REST_URL: '',
    },
    {
      ...validEnv(),
      UPSTASH_REDIS_REST_TOKEN: '',
    },
    {
      ...validEnv(),
      RATE_LIMIT_HMAC_SECRET: 'short',
    },
    {
      ...validEnv(),
      UPSTASH_REDIS_REST_URL: 'http://example.upstash.io',
    },
  ]) {
    const result = await checkContactRateLimit({
      ip: '203.0.113.10',
      env,
    });

    assert.deepEqual(result, {
      ok: false,
      reason: 'configuration',
    });
  }
});

test('allows requests below the fixed-window limit', async () => {
  let captured;

  const result = await checkContactRateLimit({
    ip: '203.0.113.10',
    env: validEnv(),
    now: () => 120_000,
    fetchImpl: async (url, options) => {
      captured = { url, options };
      return responseWith({ result: 1 });
    },
  });

  assert.equal(captured.url, 'https://example.upstash.io');
  assert.equal(
    captured.options.headers.Authorization,
    'Bearer redis-token',
  );

  const command = JSON.parse(captured.options.body);

  assert.equal(command[0], 'EVAL');
  assert.equal(command[2], 1);
  assert.equal(command[3].startsWith('ptb-m:contact:2:'), true);
  assert.equal(command[3].includes('203.0.113.10'), false);
  assert.equal(command[4], CONTACT_RATE_LIMIT.windowMs * 2);

  assert.deepEqual(result, {
    ok: true,
    limit: 60,
    remaining: 59,
    reset: 180_000,
  });
});

test('returns limited with Retry-After metadata above the limit', async () => {
  const result = await checkContactRateLimit({
    ip: '203.0.113.10',
    env: validEnv(),
    now: () => 125_000,
    fetchImpl: async () => responseWith({ result: 61 }),
  });

  assert.deepEqual(result, {
    ok: false,
    reason: 'limited',
    limit: 60,
    remaining: 0,
    reset: 180_000,
    retryAfterSeconds: 55,
  });
});

test('fails closed on Redis HTTP errors', async () => {
  const result = await checkContactRateLimit({
    ip: '203.0.113.10',
    env: validEnv(),
    fetchImpl: async () => responseWith(
      {},
      { ok: false, status: 503 },
    ),
  });

  assert.deepEqual(result, {
    ok: false,
    reason: 'unavailable',
    upstreamStatus: 503,
  });
});

test('fails closed on Redis error payloads and malformed responses', async () => {
  for (const response of [
    responseWith({ error: 'ERR failure' }),
    responseWith({ result: 'not-an-integer' }),
    responseWith({}, { jsonError: true }),
  ]) {
    const result = await checkContactRateLimit({
      ip: '203.0.113.10',
      env: validEnv(),
      fetchImpl: async () => response,
    });

    assert.deepEqual(result, {
      ok: false,
      reason: 'unavailable',
    });
  }
});

test('fails closed when Redis fetch throws', async () => {
  const result = await checkContactRateLimit({
    ip: '203.0.113.10',
    env: validEnv(),
    fetchImpl: async () => {
      throw new Error('network unavailable');
    },
  });

  assert.deepEqual(result, {
    ok: false,
    reason: 'unavailable',
  });
});

test('fails closed when Redis exceeds the timeout', async () => {
  const result = await checkContactRateLimit({
    ip: '203.0.113.10',
    env: validEnv(),
    timeoutMs: 5,
    fetchImpl: async (_url, options) => new Promise((resolve, reject) => {
      options.signal.addEventListener('abort', () => {
        const error = new Error('aborted');
        error.name = 'AbortError';
        reject(error);
      });
    }),
  });

  assert.deepEqual(result, {
    ok: false,
    reason: 'timeout',
  });
});


test('supports Vercel Marketplace KV REST environment variables', async () => {
  const result = await checkContactRateLimit({
    ip: '203.0.113.10',
    env: {
      KV_REST_API_URL: 'https://example.upstash.io',
      KV_REST_API_TOKEN: 'redis-token',
      RATE_LIMIT_HMAC_SECRET: 'a'.repeat(64),
    },
    now: () => 120_000,
    fetchImpl: async () => responseWith({ result: 1 }),
  });

  assert.deepEqual(result, {
    ok: true,
    limit: 60,
    remaining: 59,
    reset: 180_000,
  });
});
