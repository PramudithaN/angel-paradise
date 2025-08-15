/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F7CFE3', // soft pink
          light: '#FDEDF7',   // lighter pink/cream
          dark: '#E6A8C7',    // deeper pink
        },
        accent: {
          DEFAULT: '#FDE6A8', // pastel yellow
          light: '#FFF8E1',   // very light yellow
        },
        brown: {
          DEFAULT: '#6B4F3A', // brown for text/icons
        },
        cream: {
          DEFAULT: '#FFF8F3', // background
        },
        gray: {
          100: '#F7F7F7',
          200: '#EDEDED',
          300: '#D1CFCF',
          400: '#B7B7B7',
          500: '#8C8C8C',
          600: '#6B6B6B',
        },
        green: {
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
