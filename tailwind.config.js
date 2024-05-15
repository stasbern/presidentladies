const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Retro Computer', 'sans-serif'],
      },
      colors: {
        'custom-color-1': '#3490dc',
        'custom-color-2': '#6574cd',
        'custom-color-3': '#9561e2',
        'custom-color-4': '#f66d9b',
        'custom-color-5': '#f6993f',
      },
    },
  },
  plugins: [],
}