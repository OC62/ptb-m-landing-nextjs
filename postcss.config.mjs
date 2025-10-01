/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
    // Оптимизация CSS только в production
    ...(process.env.NODE_ENV === 'production'
      ? {
          'cssnano': {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              normalizeWhitespace: false,
            }]
          }
        }
      : {})
  },
};

export default config;