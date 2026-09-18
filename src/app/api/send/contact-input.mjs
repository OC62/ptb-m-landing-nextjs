export const CONTACT_LIMITS = Object.freeze({
  name: 100,
  email: 254,
  phone: 32,
  message: 5000,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SINGLE_LINE_CONTROL_CHARS = /[\r\n\u0000-\u001F\u007F]/;
const MESSAGE_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function normalizeSingleLine(value) {
  return value.trim().replace(/[ \t]+/g, ' ');
}

function normalizeMessage(value) {
  return value.replace(/\r\n?/g, '\n').trim();
}

function invalid(field, message) {
  return {
    ok: false,
    field,
    message,
  };
}

export function validateAndNormalizeContactInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return invalid('request', 'Неверный формат данных запроса.');
  }

  const raw = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: input.message,
  };

  for (const [field, value] of Object.entries(raw)) {
    if (typeof value !== 'string') {
      return invalid(field, 'Все поля обязательны для заполнения.');
    }
  }

  const values = {
    name: normalizeSingleLine(raw.name),
    email: normalizeSingleLine(raw.email),
    phone: normalizeSingleLine(raw.phone),
    message: normalizeMessage(raw.message),
  };

  for (const [field, value] of Object.entries(values)) {
    if (value === '') {
      return invalid(field, 'Все поля обязательны для заполнения.');
    }

    if (value.length > CONTACT_LIMITS[field]) {
      return invalid(field, 'Одно из полей превышает допустимую длину.');
    }
  }

  for (const field of ['name', 'email', 'phone']) {
    if (SINGLE_LINE_CONTROL_CHARS.test(values[field])) {
      return invalid(field, 'Поле содержит недопустимые символы.');
    }
  }

  if (MESSAGE_CONTROL_CHARS.test(values.message)) {
    return invalid('message', 'Сообщение содержит недопустимые символы.');
  }

  if (!EMAIL_REGEX.test(values.email)) {
    return invalid('email', 'Некорректный формат email адреса.');
  }

  const phoneDigits = values.phone.replace(/\D/g, '');

  if (
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    !/^[0-9+()\-\.\s]+$/.test(values.phone)
  ) {
    return invalid('phone', 'Некорректный формат номера телефона.');
  }

  return {
    ok: true,
    values,
  };
}

export function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function messageToHtml(value) {
  return escapeHtml(value).replace(/\n/g, '<br>');
}
