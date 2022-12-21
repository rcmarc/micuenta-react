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
