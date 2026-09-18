import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SMARTCAPTCHA_VALIDATE_URL,
  getClientIp,
  validateSmartCaptcha,
} from './captcha.mjs';

test('fails closed when CAPTCHA secret is missing', async () => {
  const result = await validateSmartCaptcha({
    secret: '',
    token: 'token',
    fetchImpl: async () => {
      throw new Error('fetch should not run');
    },
  });

  assert.deepEqual(result, { ok: false, reason: 'configuration' });
});

test('fails closed when CAPTCHA token is missing or blank', async () => {
  for (const token of [undefined, null, '', '   ']) {
    const result = await validateSmartCaptcha({
      secret: 'secret',
      token,
      fetchImpl: async () => {
        throw new Error('fetch should not run');
      },
    });

    assert.deepEqual(result, { ok: false, reason: 'missing-token' });
  }
});

test('posts form-encoded secret, token and client IP to SmartCaptcha', async () => {
  let captured;

  const result = await validateSmartCaptcha({
    secret: ' secret ',
    token: ' token ',
    ip: '203.0.113.10',
    fetchImpl: async (url, options) => {
      captured = { url, options };
      return {
        ok: true,
        status: 200,
        async json() {
          return { status: 'ok', host: 'example.test' };
        },
      };
    },
  });

  assert.equal(captured.url, SMARTCAPTCHA_VALIDATE_URL);
  assert.equal(captured.options.method, 'POST');
  assert.equal(
    captured.options.headers['Content-Type'],
    'application/x-www-form-urlencoded',
  );
  assert.equal(captured.options.cache, 'no-store');
  assert.equal(captured.options.body.get('secret'), 'secret');
  assert.equal(captured.options.body.get('token'), 'token');
  assert.equal(captured.options.body.get('ip'), '203.0.113.10');
  assert.deepEqual(result, { ok: true, host: 'example.test' });
});

test('fails closed on upstream HTTP error', async () => {
  const result = await validateSmartCaptcha({
    secret: 'secret',
    token: 'token',
    fetchImpl: async () => ({
      ok: false,
      status: 503,
    }),
  });

  assert.deepEqual(result, {
    ok: false,
    reason: 'unavailable',
    upstreamStatus: 503,
  });
});

test('fails closed on malformed upstream response', async () => {
  const result = await validateSmartCaptcha({
    secret: 'secret',
    token: 'token',
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      async json() {
        throw new Error('invalid json');
      },
    }),
  });

  assert.deepEqual(result, { ok: false, reason: 'unavailable' });
});

test('fails closed when SmartCaptcha rejects the token', async () => {
  const result = await validateSmartCaptcha({
    secret: 'secret',
    token: 'token',
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      async json() {
        return { status: 'failed' };
      },
    }),
  });

  assert.deepEqual(result, { ok: false, reason: 'rejected' });
});

test('extracts the first forwarded IP and falls back to x-real-ip', () => {
  const forwardedHeaders = new Headers({
    'x-forwarded-for': '203.0.113.10, 198.51.100.2',
  });
  const realIpHeaders = new Headers({
    'x-real-ip': '198.51.100.44',
  });

  assert.equal(getClientIp(forwardedHeaders), '203.0.113.10');
  assert.equal(getClientIp(realIpHeaders), '198.51.100.44');
  assert.equal(getClientIp(new Headers()), '');
});
