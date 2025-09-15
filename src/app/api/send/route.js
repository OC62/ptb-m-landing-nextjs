// nextjs/src/app/api/send/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    const { name, email, phone, message, smartcaptcha_token } = formData;

    // --- 1. Проверка обязательных полей ---
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Все поля обязательны для заполнения.' 
        },
        { status: 400 }
      );
    }

    // --- 2. Валидация email ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Некорректный формат email адреса.' 
        },
        { status: 400 }
      );
    }

    // --- 3. Проверка капчи ---
    if (!IS_CAPTCHA_DISABLED && CAPTCHA_SECRET) {
      if (!smartcaptcha_token && smartcaptcha_token !== '') {
        return NextResponse.json(
          { 
            status: 'error',
            message: 'Не передан токен капчи.' 
          },
          { status: 400 }
        );
      }

      if (smartcaptcha_token === '') {
        console.log('Пустой токен капчи, проверка пропущена (локальная разработка).');
      } else {
        try {
          const captchaResponse = await fetch(
            `https://smartcaptcha.yandexcloud.net/validate?secret=${CAPTCHA_SECRET}&token=${smartcaptcha_token}&ip=${request.ip || ''}`,
            { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          if (!captchaResponse.ok) {
            throw new Error(`HTTP error! status: ${captchaResponse.status}`);
          }

          const captchaData = await captchaResponse.json();

          if (!captchaData || captchaData.status !== 'ok') {
            const errorCodes = captchaData.error_codes ? captchaData.error_codes.join(', ') : 'Неизвестная ошибка';
            return NextResponse.json(
              { 
                status: 'error',
                message: `Проверка "Я не робот" не пройдена. Коды ошибок: ${errorCodes}` 
              },
              { status: 400 }
            );
          }
        } catch (captchaError) {
          logError(captchaError, 'Ошибка проверки капчи');
          return NextResponse.json(
            { 
              status: 'error',
              message: 'Ошибка при проверке капчи. Попробуйте позже.' 
            },
            { status: 500 }
          );
        }
      }
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
      replyTo: `${name} <${email}>`,
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
            <p><strong>👤 Имя:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📞 Телефон:</strong> ${phone}</p>
            <p><strong>💬 Сообщение:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
              ${message.replace(/\n/g, '<br>')}
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