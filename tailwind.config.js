/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono'],
        year: ['Poppins'],
      },
      colors: {
        brand: {
          beige: '#EAE1DA',
          beige2: '#F0EBE8',
          gray: '#475F6F',
          gray2: '#000000',
          red: '#BD5141',
          black: '#1E1E1E',
          yellow: '#EFAD5F',
        },
      },
      boxShadow: {
        question: '4px 4px 25px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
