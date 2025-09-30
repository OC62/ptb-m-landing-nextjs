/** @type {import('next').NextConfig} */
const nextConfig = {
  // УБИРАЕМ headers временно для диагностики
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY'
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff'
  //         }
  //       ],
  //     },
  //   ]
  // },

  // ✅ ПРАВИЛЬНЫЕ редиректы ТОЛЬКО для альтернативных доменов
  async redirects() {
    return [
      // Редирект с кириллического домена на основной
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
            value: 'www.птб-м.рф',
          },
        ],
        destination: 'https://www.xn----9sb8ajp.xn--p1ai/:path*',
        permanent: true,
      },
      // Редирект с non-www punycode на www
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

  images: {
    domains: ['smartcaptcha.yandexcloud.net', 'mc.yandex.ru', 'yastatic.net'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  poweredByHeader: false,
  compress: true,
  // Добавляем для стабильности
  trailingSlash: false,
}

export default nextConfig