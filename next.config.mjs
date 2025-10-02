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

  // Только редиректы и rewrites - заголовки теперь в middleware
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
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
  
  // Включение production source maps для отладки
  productionBrowserSourceMaps: false,
}

export default nextConfig