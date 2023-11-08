/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dffcd0',
        secondary: '#00191d',
        tertiary: '#86af83'
      }
    },
  },
  plugins: [],
}