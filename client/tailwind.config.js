/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Quicksand: ['Quicksand', 'sans-serif'],
        Anton: ['Anton', 'Quicksand'],
      },
      colors: {
        'black-transparent': 'rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}