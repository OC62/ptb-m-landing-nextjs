/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Basic Security Headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // CSP Header - ИСПРАВЛЕННАЯ ВЕРСИЯ
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://smartcaptcha.yandexcloud.net https://mc.yandex.ru https://yastatic.net;
              style-src 'self' 'unsafe-inline' https://smartcaptcha.yandexcloud.net;
              img-src 'self' data: blob: https: https://mc.yandex.ru https://yastatic.net;
              font-src 'self' data: https://smartcaptcha.yandexcloud.net;
              connect-src 'self' https://smartcaptcha.yandexcloud.net https://mc.yandex.ru;
              frame-src https://smartcaptcha.yandexcloud.net https://mc.yandex.ru;
              child-src https://smartcaptcha.yandexcloud.net https://mc.yandex.ru;
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
          }
        ],
      },
    ]
  },
  images: {
    domains: ['smartcaptcha.yandexcloud.net', 'mc.yandex.ru', 'yastatic.net'],
    formats: ['image/webp', 'image/avif'], // Добавить поддержку AVIF
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  poweredByHeader: false,
  // Включите компрессию
  compress: true,
  // УБРАНО: swcMinify больше не поддерживается в Next.js 15
  // swcMinify: true,
  experimental: {
    optimizeCss: true, // можно оставить, если используется
  },
}

export default nextConfig