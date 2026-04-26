/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'elias-pulse': 'elias-pulse 2.5s ease-in-out infinite',
        'window-open': 'window-open 250ms ease-out forwards',
        'window-close': 'window-close 200ms ease-in forwards',
        'gradient-shift': 'gradient-shift 20s ease infinite',
      },
      keyframes: {
        'elias-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(99,102,241,0.5)' },
          '50%': { boxShadow: '0 0 25px rgba(99,102,241,0.9)' },
        },
        'window-open': {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'window-close': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.8)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
