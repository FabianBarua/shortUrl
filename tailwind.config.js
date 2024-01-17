/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.pug', './public/js/*/**.js'],
  theme: {
    extend: {},
    fontFamily: { inter: ['inter', 'sans-serif'] }
  },
  plugins: []
}
