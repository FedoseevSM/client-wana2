/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF', // primary
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#E6FFFC',
          100: '#CCFFF9',
          200: '#99FFF3',
          300: '#66FFED',
          400: '#33FFE7',
          500: '#00F5E1',
          600: '#00C2B2', // secondary
          700: '#009184',
          800: '#006157',
          900: '#003029',
        },
        accent: {
          50: '#FFFAE6',
          100: '#FFF5CC',
          200: '#FFEB99',
          300: '#FFE066',
          400: '#FFD633',
          500: '#FFCC00', // accent
          600: '#CCA300',
          700: '#997A00',
          800: '#665200',
          900: '#332900',
        },
        success: {
          50: '#E6FFF0',
          100: '#CCFFE0',
          200: '#99FFC2',
          300: '#66FFA3',
          400: '#33FF85',
          500: '#00FF66',
          600: '#00CC52',
          700: '#00993D',
          800: '#006629',
          900: '#003314',
        },
        warning: {
          50: '#FFF8E6',
          100: '#FFF1CC',
          200: '#FFE499',
          300: '#FFD766',
          400: '#FFC933',
          500: '#FFBC00',
          600: '#CC9600',
          700: '#997100',
          800: '#664B00',
          900: '#332600',
        },
        error: {
          50: '#FFE6E6',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF0000',
          600: '#CC0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};