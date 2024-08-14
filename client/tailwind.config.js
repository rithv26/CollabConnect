/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '24inches': '1920px',
        // => @media (min-width: 1024px) { ... }
    
        '27inches': '2560px',
        // => @media (min-width: 1280px) { ... }
      },    
      fontFamily: {
        Quicksand: ['Quicksand', 'sans-serif'],
        Anton: ['Anton', 'Quicksand'],
        Montserrat: ['Montserrat'],
      },
      colors: {
        'black-transparent': 'rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["dark", "light", "black"],
  },
}