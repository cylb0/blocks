/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c2d1b',
        secondary: '#6c7354',
        tertiary: '#8c9371',
        quaternary: '#c6cfa2'
      }
    },
  },
  plugins: [],
}