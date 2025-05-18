/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[class*="app-dark"]'],
  content: [
    './index.html',
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "docs/content/**/*.md",
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [require('tailwindcss-primeui')],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px'
    },
    extend: {
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "76v": "76vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      width: {
        "10v": "10vw",
        "20v": "20vw",
        "30v": "30vw",
        "40v": "40vw",
        "50v": "50vw",
        "60v": "60vw",
        "70v": "70vw",
        "76v": "76vw",
        "80v": "80vw",
        "90v": "90vw",
        "100v": "100vw",
      },
    },

  }
};
