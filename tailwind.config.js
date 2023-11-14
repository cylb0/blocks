/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f380f',
        secondary: '#306230',
        tertiary: '#8bac0f',
        quaternary: '#9bbc0f'
      }
    },
  },
  plugins: [],
}