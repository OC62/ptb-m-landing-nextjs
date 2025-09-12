// nextjs/next.config.mjs
import path from 'path'; // Импортируем модуль path

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Указываем корень проекта явно
  turbopack: {
    root: path.join(__dirname), // __dirname - это путь к папке, где лежит этот файл (корень проекта)
  },
  // Другие настройки, если есть...
};

export default nextConfig;