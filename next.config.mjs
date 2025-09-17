// nextjs/next.config.mjs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Получаем __dirname в ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Указываем корень проекта явно для Turbopack
  turbopack: {
    root: join(__dirname),
  },
  // Настройка изображений: разрешаем загрузку с mc.yandex.ru
  images: {
    domains: [
      'mc.yandex.ru', // <-- Добавлено: разрешаем загрузку изображений с этого домена
    ],
  },
  // Другие настройки, если есть...
};

export default nextConfig;