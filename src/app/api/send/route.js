// nextjs/src/app/api/send/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// --- Секретный ключ капчи из .env ---
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
// --- Флаг для отключения капчи на сервере ---
const IS_CAPTCHA_DISABLED = process.env.DISABLE_CAPTCHA_FOR_LOCAL_DEV === 'true';

console.log('NEXT_PUBLIC_DISABLE_CAPTCHA_FOR_LOCAL_DEV:', process.env.NEXT_PUBLIC_DISABLE_CAPTCHA_FOR_LOCAL_DEV);
console.log('IS_CAPTCHA_DISABLED_FOR_DEV (рассчитано):', IS_CAPTCHA_DISABLED_FOR_DEV);

export async function POST(request) {
  try {
    let formData;
    try {
      formData = await request.json();
    } catch (jsonError) {
      console.error('Ошибка парсинга JSON:', jsonError);
      return NextResponse.json(
        { error: 'Неверный формат данных запроса (ожидается JSON).' },
        { status: 400 }
      );
    }

    const { name, email, phone, message, smartcaptcha_token } = formData;

    // --- 1. Проверка обязательных полей ---
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения.' },
        { status: 400 }
      );
    }

    // --- 2. Проверка капчи ---
    // Если капча не отключена принудительно, выполняем проверку
    if (!IS_CAPTCHA_DISABLED && CAPTCHA_SECRET) {
      if (!smartcaptcha_token && smartcaptcha_token !== '') {
        // Проверяем, что токен либо есть, либо это не пустая строка (на случай заглушки)
        return NextResponse.json(
          { error: 'Не передан токен капчи.' },
          { status: 400 }
        );
      }

      // Если токен пустой (заглушка), пропустить проверку
      if (smartcaptcha_token === '') {
        console.log(
          'Пустой токен капчи, проверка пропущена (возможно, локальная разработка).'
        );
      } else {
        const captchaResponse = await fetch(
          `https://smartcaptcha.yandexcloud.net/validate?secret=${CAPTCHA_SECRET}&token=${smartcaptcha_token}`,
          { method: 'POST' }
        );

        let captchaData;
        try {
          captchaData = await captchaResponse.json();
        } catch (captchaJsonError) {
          console.error('Ошибка парсинга JSON от капчи:', captchaJsonError);
          return NextResponse.json(
            {
              error: 'Ошибка проверки капчи: Неверный ответ от сервера капчи.',
            },
            { status: 500 }
          );
        }

        if (!captchaData || !captchaData.hasOwnProperty('success')) {
          console.error('Неполный ответ от сервера капчи:', captchaData);
          return NextResponse.json(
            { error: 'Ошибка проверки капчи: Неполный ответ от сервера.' },
            { status: 500 }
          );
        }

        if (!captchaData.success) {
          console.error('Ошибка проверки капчи:', captchaData);
          // Более информативное сообщение об ошибке от капчи
          const errorMessage = captchaData.error_codes
            ? `Коды ошибок: ${captchaData.error_codes.join(', ')}`
            : 'Неизвестная ошибка.';
          return NextResponse.json(
            { error: `Проверка "Я не робот" не пройдена. ${errorMessage}` },
            { status: 400 }
          );
        }
      }
    }
    // Если IS_CAPTCHA_DISABLED=true или CAPTCHA_SECRET не задан, капча игнорируется

    // --- 3. Настройка Nodemailer ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === '465', // true для 465, false для других
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // --- 4. Формирование письма ---
    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `Новое сообщение с сайта от ${name}`,
      text: `
        Имя: ${name}
        Email: ${email}
        Телефон: ${phone}

        Сообщение:
        ${message}
      `,
      html: `
        <h3>Новое сообщение с сайта</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // --- 5. Отправка письма ---
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено: %s', info.messageId);

    // --- 6. Ответ клиенту ---
    return NextResponse.json(
      { success: true, message: 'Сообщение успешно отправлено!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API route error:', error);
    // Проверяем, не была ли ошибка отправки почты
    if (error.code === 'EAUTH' || error.code === 'EENVELOPE') {
      return NextResponse.json(
        {
          error:
            'Ошибка аутентификации SMTP или неверный адрес отправителя/получателя. Проверьте настройки SMTP.',
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Ошибка сервера при отправке сообщения. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
