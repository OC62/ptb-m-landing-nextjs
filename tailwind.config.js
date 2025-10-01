/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Отключение неиспользуемых стилей в production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    options: {
      safelist: ['dark'], // Сохранять dark mode классы
    }
  },
  theme: {
    extend: {
      // Оптимизированные анимации
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      colors: {
        // Оптимизированная цветовая палитра с лучшим контрастом
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Основной цвет
          600: '#2563eb', // Улучшенный контраст
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Оптимизированные серые цвета для accessibility
        gray: {
          50: '#fafafa',   // Улучшенный контраст
          100: '#f4f4f5', 
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b', // Минимальный контраст 4.5:1
          700: '#3f3f46',
          800: '#27272a', // Хороший контраст
          900: '#18181b', // Отличный контраст
        }
      },
      fontFamily: {
        sans: [
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'sans-serif'
        ],
      },
      // Оптимизация transition
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      // Оптимизация opacity
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      }
    },
  },
  plugins: [
    // Плагин для оптимизации CSS
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.optimize-legibility': {
          'text-rendering': 'optimizeLegibility',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}