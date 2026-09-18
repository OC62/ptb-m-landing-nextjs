export const SMARTCAPTCHA_VALIDATE_URL = 'https://smartcaptcha.cloud.yandex.ru/validate';

export function getClientIp(headers) {
  const forwardedFor = headers?.get?.('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return headers?.get?.('x-real-ip')?.trim() || '';
}

export async function validateSmartCaptcha({
  secret,
  token,
  ip = '',
  fetchImpl = fetch,
}) {
  if (typeof secret !== 'string' || secret.trim() === '') {
    return { ok: false, reason: 'configuration' };
  }

  if (typeof token !== 'string' || token.trim() === '') {
    return { ok: false, reason: 'missing-token' };
  }

  const body = new URLSearchParams({
    secret: secret.trim(),
    token: token.trim(),
  });

  if (ip) {
    body.set('ip', ip);
  }

  let response;

  try {
    response = await fetchImpl(SMARTCAPTCHA_VALIDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      cache: 'no-store',
    });
  } catch {
    return { ok: false, reason: 'unavailable' };
  }

  if (!response.ok) {
    return {
      ok: false,
      reason: 'unavailable',
      upstreamStatus: response.status,
    };
  }

  let data;

  try {
    data = await response.json();
  } catch {
    return { ok: false, reason: 'unavailable' };
  }

  if (data?.status !== 'ok') {
    return { ok: false, reason: 'rejected' };
  }

  return {
    ok: true,
    host: typeof data.host === 'string' ? data.host : null,
  };
}
