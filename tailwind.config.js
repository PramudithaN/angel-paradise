/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bespoke Heirloom Boutique Palette
        rose: {
          50: '#FDF6F7',
          100: '#F9E8EC',
          200: '#F3D1D9',
          300: '#EAAEB9',
          400: '#E28C97', // Primary Brand Accent
          500: '#D46E7C',
          600: '#B84E5D',
          700: '#9A3A47',
        },
        sage: {
          50: '#F3F7F5',
          100: '#E3ECE7',
          200: '#C7D9CF',
          300: '#A4C0B1',
          400: '#7E9F8E',
          500: '#5F8271', // Secondary Trust & Nature Accent
          600: '#4A695A',
        },
        bark: {
          50: '#F8F6F4',
          100: '#EFECE7',
          200: '#DFD9D1',
          300: '#C5BDB2',
          400: '#988C7E',
          500: '#786C5E',
          600: '#5D5144',
          700: '#463C32',
          800: '#342C24',
          900: '#261E18', // Primary Text / Deep Antique Bark
        },
        voile: {
          DEFAULT: '#FAF7F2', // Soft Cotton Voile Canvas
          light: '#FFFFFF',
          dark: '#F3EFE8',
        },
        linen: {
          DEFAULT: '#F3ECE2', // Sand / Linen Card Background
          hover: '#EAE1D5',
        },
        gold: {
          DEFAULT: '#D4A359',
          light: '#F8EEDB',
          dark: '#B28238',
        },
        // Mapped Aliases for graceful backward compatibility
        primary: {
          DEFAULT: '#E28C97',
          light: '#FDF6F7',
          dark: '#D46E7C',
        },
        accent: {
          DEFAULT: '#5F8271',
          light: '#F3F7F5',
          dark: '#4A695A',
        },
        brown: {
          DEFAULT: '#261E18',
          light: '#5D5144',
          dark: '#1D1712',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          card: '#FFFFFF',
        },
        green: {
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(38, 30, 24, 0.05)',
        'soft-lg': '0 12px 32px -4px rgba(38, 30, 24, 0.08)',
        'soft-xl': '0 20px 48px -6px rgba(38, 30, 24, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
