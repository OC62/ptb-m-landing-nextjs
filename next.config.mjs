/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включение турбопак для разработки
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Оптимизированные заголовки безопасности и кэширования
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // 🔒 CSP заголовки против XSS
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://smartcaptcha.yandexcloud.net https://mc.yandex.ru https://yastatic.net;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://smartcaptcha.yandexcloud.net https://mc.yandex.ru;
              frame-src 'self' https://smartcaptcha.yandexcloud.net;
              worker-src 'self' blob:;
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' ').trim()
          },
          // 🔒 COOP для изоляции источников
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|gif|ico|webp|avif|svg)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          }
        ],
      },
    ]
  },

  // Оптимизированные редиректы
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'птб-м.рф',
          },
        ],
        destination: 'https://www.xn----9sb8ajp.xn--p1ai/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
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

  // Оптимизированные rewrites
  async rewrites() {
    return [
      {
        source: '/yandex_6c8d32099a45287d.html',
        destination: '/yandex_6c8d32099a45287d.html',
      },
      {
        source: '/yandex_f5bc48680f827787.html',
        destination: '/yandex_f5bc48680f827787.html',
      },
    ];
  },

  // Оптимизированная конфигурация изображений
  images: {
    domains: ['smartcaptcha.yandexcloud.net', 'mc.yandex.ru', 'yastatic.net'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: false,
  },

  // Включение компрессии
  compress: true,
  
  // Отключение ненужных заголовков
  poweredByHeader: false,
  
  // Оптимизация сборки
  trailingSlash: false,
  
  // Компиляторные оптимизации
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig