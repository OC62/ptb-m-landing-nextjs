import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CONTACT_LIMITS,
  escapeHtml,
  messageToHtml,
  validateAndNormalizeContactInput,
} from './contact-input.mjs';

const validInput = () => ({
  name: ' Иван Иванов ',
  email: ' user@example.com ',
  phone: ' +7 (999) 123-45-67 ',
  message: ' Первая строка\r\nВторая строка ',
});

test('normalizes valid contact input', () => {
  const result = validateAndNormalizeContactInput(validInput());

  assert.deepEqual(result, {
    ok: true,
    values: {
      name: 'Иван Иванов',
      email: 'user@example.com',
      phone: '+7 (999) 123-45-67',
      message: 'Первая строка\nВторая строка',
    },
  });
});

test('rejects missing, non-string and blank required fields', () => {
  for (const [field, value] of [
    ['name', undefined],
    ['email', null],
    ['phone', 79991234567],
    ['message', '   '],
  ]) {
    const input = validInput();
    input[field] = value;

    const result = validateAndNormalizeContactInput(input);

    assert.equal(result.ok, false);
    assert.equal(result.field, field);
  }
});

test('enforces maximum lengths', () => {
  for (const field of ['name', 'email', 'phone', 'message']) {
    const input = validInput();
    input[field] = 'a'.repeat(CONTACT_LIMITS[field] + 1);

    const result = validateAndNormalizeContactInput(input);

    assert.equal(result.ok, false);
    assert.equal(result.field, field);
  }
});

test('rejects control characters in single-line header fields', () => {
  for (const field of ['name', 'email', 'phone']) {
    const input = validInput();
    input[field] = field === 'email'
      ? 'user@example.com\r\nBcc: attacker@example.com'
      : 'value\nInjected';

    const result = validateAndNormalizeContactInput(input);

    assert.equal(result.ok, false);
    assert.equal(result.field, field);
  }
});

test('rejects unsafe message control characters but preserves newlines', () => {
  const invalidInput = validInput();
  invalidInput.message = 'hello\u0000world';

  const invalidResult = validateAndNormalizeContactInput(invalidInput);
  assert.equal(invalidResult.ok, false);
  assert.equal(invalidResult.field, 'message');

  const validMessageInput = validInput();
  validMessageInput.message = 'line one\nline two';

  const validResult = validateAndNormalizeContactInput(validMessageInput);
  assert.equal(validResult.ok, true);
  assert.equal(validResult.values.message, 'line one\nline two');
});

test('rejects invalid email formats', () => {
  for (const email of ['invalid', 'user@', '@example.com', 'a b@example.com']) {
    const input = validInput();
    input.email = email;

    const result = validateAndNormalizeContactInput(input);

    assert.equal(result.ok, false);
    assert.equal(result.field, 'email');
  }
});

test('accepts common formatted phone numbers and rejects invalid phones', () => {
  for (const phone of [
    '+7 (999) 123-45-67',
    '8 999 123 45 67',
    '+421 901 234 567',
  ]) {
    const input = validInput();
    input.phone = phone;

    assert.equal(validateAndNormalizeContactInput(input).ok, true);
  }

  for (const phone of ['123', '+7 CALL-ME-NOW', '+1234567890123456']) {
    const input = validInput();
    input.phone = phone;

    const result = validateAndNormalizeContactInput(input);

    assert.equal(result.ok, false);
    assert.equal(result.field, 'phone');
  }
});

test('escapes HTML special characters', () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)"> & \'quoted\''),
    '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;quoted&#39;',
  );
});

test('escapes message before converting newlines to br tags', () => {
  assert.equal(
    messageToHtml('<b>Hello</b>\n<script>alert(1)</script>'),
    '&lt;b&gt;Hello&lt;/b&gt;<br>&lt;script&gt;alert(1)&lt;/script&gt;',
  );
});
