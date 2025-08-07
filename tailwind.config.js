/** @type {import('@tailwindcss/postcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cocogoose': ['Cocogoose Classic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}