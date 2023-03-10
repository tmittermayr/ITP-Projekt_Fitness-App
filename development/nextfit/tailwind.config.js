/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Open Sans"', 'sans-serif']
      },
      backgroundImage: {
        'login_background_svg': "url(/public/assets/login_background.svg)"
      }
    },
  },
  plugins: [],
}
