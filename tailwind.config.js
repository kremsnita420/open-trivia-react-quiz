/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { letterSpacing: '2px' },
          '50%': { letterSpacing: 'initial' },
        }
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

