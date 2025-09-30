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
          // CSP Header
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://smartcaptcha.yandexcloud.net https://mc.yandex.ru https://yastatic.net;
              style-src 'self' 'unsafe-inline' https://smartcaptcha.yandexcloud.net;
              img-src 'self' data: blob: https:;
              font-src 'self' data: https://smartcaptcha.yandexcloud.net;
              connect-src 'self' https://smartcaptcha.yandexcloud.net https://mc.yandex.ru;
              frame-src https://smartcaptcha.yandexcloud.net;
              child-src https://smartcaptcha.yandexcloud.net;
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

  // ✅ Правильные редиректы с исключением для файла подтверждения
  async redirects() {
    return [
      // Редирект с кириллических доменов на основной
      {
        source: '/:path((?!yandex_f5bc48680f827787\\.html).*)',
        has: [
          {
            type: 'host',
            value: '(www\\.)?птб-м\\.рф',
          },
        ],
        destination: 'https://www.xn----9sb8ajp.xn--p1ai/:path*',
        permanent: true,
      },
      // Редирект с non-www на www
      {
        source: '/:path((?!yandex_f5bc48680f827787\\.html).*)',
        has: [
          {
            type: 'host',
            value: 'xn----9sb8ajp.xn--p1ai',
          },
        ],
        destination: 'https://www.xn----9sb8ajp.xn--p1ai/:path*',
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['smartcaptcha.yandexcloud.net', 'mc.yandex.ru', 'yastatic.net'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  poweredByHeader: false,
  compress: true,
}

export default nextConfig