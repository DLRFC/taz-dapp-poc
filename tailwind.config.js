/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
    './node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono'],
        year: ['Poppins']
      },
      fontSize: {
        'brand-sm': '.9rem',
        'brand-4xl': ['2.75rem', '2.6rem'],
        'brand-2xs': ['.75rem', '.75rem'],
        'brand-h1': '32px',
        'brand-h2': '20px',
        'brand-h3': '16px',
        'brand-button': '14px',
        'brand-body': '14px',
        'brand-info': '12px'
      },
      colors: {
        brand: {
          beige: '#EAE1DA',
          beige2: '#F0EBE8',
          blue: '#435C6C',
          gray: '#475F6F',
          gray2: '#000000',
          gray60: '#333333',
          red: '#BD5141',
          black: '#1E1E1E',
          yellow: '#EFAD5F',
          orange: '#BD5141',
          brown: '#402917',
          brown2: '#513E2E'
        }
      },
      boxShadow: {
        question: '4px 4px 25px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')]
})
