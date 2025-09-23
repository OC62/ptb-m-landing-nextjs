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
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://smartcaptcha.yandexcloud.net https://mc.yandex.ru;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https:;
              font-src 'self';
              connect-src 'self' https://smartcaptcha.yandexcloud.net;
              frame-src https://smartcaptcha.yandexcloud.net;
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ]
  },
  images: {
    domains: ['smartcaptcha.yandexcloud.net'],
    formats: ['image/webp', 'image/avif'],
  },
  poweredByHeader: false,
}

export default nextConfig