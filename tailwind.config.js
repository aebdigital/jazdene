/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Override green palette → gold/amber accent rgb(208,173,36)
        green: {
          300: '#e5c832',
          400: '#D0AD24',
          500: '#BA9A1E',
          600: '#A38818',
          700: '#8C7614',
          800: '#756410',
          900: '#5e500d',
        },
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
