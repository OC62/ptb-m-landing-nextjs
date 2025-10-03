/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['smartcaptcha.yandexcloud.net', 'mc.yandex.ru', 'yastatic.net'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;