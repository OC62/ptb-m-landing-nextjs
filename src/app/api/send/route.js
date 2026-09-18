// nextjs/src/app/api/send/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getClientIp, validateSmartCaptcha } from './captcha.mjs';
import { checkContactRateLimit } from './rate-limit.mjs';
import { escapeHtml, messageToHtml, validateAndNormalizeContactInput } from './contact-input.mjs';

// --- Секретный ключ капчи из .env ---
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
// --- Флаг для отключения капчи на сервере ---
const IS_CAPTCHA_DISABLED = process.env.NEXT_PUBLIC_DISABLE_CAPTCHA_FOR_LOCAL_DEV === 'true';

// Функция для логирования ошибок
const logError = (error, context = '') => {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ${context}: ${error.message}\nStack: ${error.stack}\n`;
  console.error(errorMessage);
  
  // Здесь можно добавить запись в файл лога или отправку в сервис мониторинга
  // Например: await logToFile(errorMessage);
};

export async function POST(request) {
  try {
    const clientIp = getClientIp(request.headers);
    const rateLimitResult = await checkContactRateLimit({
      ip: clientIp,
    });

    if (!rateLimitResult.ok) {
      if (rateLimitResult.reason === 'limited') {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Слишком много запросов. Попробуйте позже.',
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(rateLimitResult.retryAfterSeconds),
            },
          },
        );
      }

      logError(
        new Error(
          `Contact rate limit unavailable: ${rateLimitResult.reason}`,
        ),
        'Ошибка rate limit',
      );

      return NextResponse.json(
        {
          status: 'error',
          message: 'Сервис защиты формы временно недоступен. Попробуйте позже.',
        },
        { status: 503 },
      );
    }

    let formData;
    try {
      formData = await request.json();
    } catch (jsonError) {
      logError(jsonError, 'Ошибка парсинга JSON');
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Неверный формат данных запроса (ожидается JSON).' 
        },
        { status: 400 }
      );
    }

    const { smartcaptcha_token } = formData;

    // --- 1. Серверная валидация и нормализация пользовательского ввода ---
    const inputResult = validateAndNormalizeContactInput(formData);

    if (!inputResult.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message: inputResult.message,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = inputResult.values;

    // --- 3. Проверка капчи ---
    const captchaResult = await validateSmartCaptcha({
      secret: CAPTCHA_SECRET,
      token: smartcaptcha_token,
      ip: clientIp,
    });

    if (!captchaResult.ok) {
      if (captchaResult.reason === 'configuration') {
        logError(new Error('CAPTCHA_SECRET is missing'), 'Ошибка конфигурации капчи');
        return NextResponse.json(
          {
            status: 'error',
            message: 'Сервис проверки безопасности временно недоступен. Попробуйте позже.',
          },
          { status: 503 }
        );
      }

      if (captchaResult.reason === 'missing-token') {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Не передан токен капчи.',
          },
          { status: 400 }
        );
      }

      if (captchaResult.reason === 'rejected') {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Проверка "Я не робот" не пройдена.',
          },
          { status: 400 }
        );
      }

      logError(new Error('SmartCaptcha validation unavailable'), 'Ошибка проверки капчи');
      return NextResponse.json(
        {
          status: 'error',
          message: 'Ошибка при проверке капчи. Попробуйте позже.',
        },
        { status: 503 }
      );
    }

    // --- 4. Настройка Nodemailer ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Таймауты для лучшей обработки ошибок
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // --- 5. Формирование письма ---
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'Форма обратной связи'}" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: { name, address: email },
      subject: `📩 Новое сообщение с сайта от ${name}`,
      text: `
Имя: ${name}
Email: ${email}
Телефон: ${phone}

Сообщение:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">📬 Новое сообщение с сайта</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p><strong>👤 Имя:</strong> ${escapeHtml(name)}</p>
            <p><strong>📧 Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>📞 Телефон:</strong> ${escapeHtml(phone)}</p>
            <p><strong>💬 Сообщение:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
              ${messageToHtml(message)}
            </div>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p><strong>🌐 IP:</strong> ${request.ip || 'Неизвестно'}</p>
            <p><strong>🕐 Время:</strong> ${new Date().toLocaleString('ru-RU')}</p>
          </div>
        </div>
      `,
    };

    // --- 6. Отправка письма ---
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Письмо отправлено:', info.messageId);

      // --- 7. Успешный ответ ---
      return NextResponse.json(
        { 
          status: 'success',
          message: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.' 
        },
        { status: 200 }
      );

    } catch (emailError) {
      logError(emailError, 'Ошибка отправки email');
      
      // Более конкретные сообщения об ошибках
      let errorMessage = 'Ошибка сервера при отправке сообщения. Попробуйте позже.';
      
      if (emailError.code === 'EAUTH') {
        errorMessage = 'Ошибка аутентификации SMTP. Проверьте настройки почты.';
      } else if (emailError.code === 'EENVELOPE') {
        errorMessage = 'Ошибка в данных отправителя/получателя.';
      } else if (emailError.code === 'ECONNECTION') {
        errorMessage = 'Не удалось подключиться к SMTP серверу.';
      }

      return NextResponse.json(
        { 
          status: 'error',
          message: errorMessage 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    logError(error, 'Неожиданная ошибка в API');
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Внутренняя ошибка сервера. Попробуйте позже.' 
      },
      { status: 500 }
    );
  }
}

// Добавляем обработчик OPTIONS для CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://xn----9sb8ajp.xn--p1ai',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Origin, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}