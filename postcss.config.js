// nextjs/postcss.config.mjs
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    tailwindcss, // ✅ Правильный импорт через import
    autoprefixer, // ✅ Правильный импорт через import
    // Другие PostCSS плагины, если есть
  ],
};

export default config;