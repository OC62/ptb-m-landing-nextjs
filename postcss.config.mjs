// nextjs/postcss.config.mjs

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'tailwindcss',    // ✅ Передаём как строку
    'autoprefixer',   // ✅ Передаём как строку
  ],
};

export default config;