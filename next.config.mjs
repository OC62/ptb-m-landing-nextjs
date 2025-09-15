// next.config.mjs
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/app/components'),
      '@/hooks': resolve(__dirname, 'src/app/hooks'),
    };
    return config;
  },
  // Отключите экспериментальные функции, если они не нужны
  experimental: {},
};

export default nextConfig;