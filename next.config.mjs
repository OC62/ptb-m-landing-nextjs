// nextjs/next.config.mjs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Указываем корень проекта явно для Turbopack
  turbopack: {
    root: join(__dirname), // Правильный путь к корню проекта
  },
};

export default nextConfig;