import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Безопасные заголовки
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // Обновленные CSP заголовки с разрешением data: для шрифтов
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://smartcaptcha.yandexcloud.net https://captcha-api.yandex.ru https://mc.yandex.ru https://yastatic.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://smartcaptcha.yandexcloud.net",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com", // Добавлено data: для встроенных шрифтов
      "connect-src 'self' https://smartcaptcha.yandexcloud.net https://captcha-api.yandex.ru https://mc.yandex.ru",
      "frame-src 'self' https://smartcaptcha.yandexcloud.net https://captcha-api.yandex.ru",
      "worker-src 'self' blob:",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  );

  // COOP для изоляции (убрали COEP из-за ошибок Яндекс.Переводчика)
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  // Убрали: response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|yandex_.*\\.html).*)',
  ],
};