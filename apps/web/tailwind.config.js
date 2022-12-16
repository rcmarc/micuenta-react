const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './layouts/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    extend: {
      screens: {
        xs: '500px',
      },
      colors: {
        background: colors.slate[100],
        input: {
          bg: colors.slate[200],
          fg: colors.slate[600],
        },
        foreground: {
          light: colors.slate[500],
          dark: colors.slate[800],
        },
        primary: {
          50: '#e3f7fc',
          100: '#b7eaf8',
          200: '#89ddf4',
          300: '#5fcff0',
          400: '#40c4ef',
          500: '#26b9ef',
          600: '#1dabe0',
          700: '#0f98cd',
          800: '#0e86ba',
          900: '#006699',
        },
        accent: {
          50: '#e0f3f0',
          100: '#b2e0d7',
          200: '#81cdbe',
          300: '#4eb8a4',
          400: '#28a992',
          500: '#009980',
          600: '#008c73',
          700: '#007c64',
          800: '#006c55',
          900: '#00503a',
        },
        error: {
          50: '#fde5f0',
          100: '#fcbedb',
          200: '#fc93c2',
          300: '#fd65a9',
          400: '#fd3e93',
          500: '#ff037d',
          600: '#ec0479',
          700: '#d50573',
          800: '#bf036e',
          900: '#990066',
        },
      },
      keyframes: {
        'progress-indeterminate': {
          '0%': {
            transform: 'translateX(0) scaleX(0)',
          },
          '70%': { transform: 'translateX(0) scaleX(1)' },
          '100%': { transform: 'translateX(100%) scaleX(0)' },
        },
      },
      animation: {
        'progress-indeterminate':
          'progress-indeterminate 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
