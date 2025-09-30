/** @type {import('next').NextConfig} */
const nextConfig = {
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
          }
        ],
      },
    ]
  },

  // Базовые редиректы
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

  // ✅ Явные rewrites для файлов подтверждения
  async rewrites() {
    return [
      // Файлы подтверждения доступны напрямую на всех доменах
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

  images: {
    domains: ['smartcaptcha.yandexcloud.net', 'mc.yandex.ru', 'yastatic.net'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
}

export default nextConfig