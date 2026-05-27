/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      gray : {
        100 : "#eeeeef",
        200 : "#e6e9ed",
        600 : "#95989c"
      },
      purple : {
        200 : "#d9ddee",
        500 : "#9492db",
        600 : "#7164c0"
      },
      utilities: {
        'break-inside': ['responsive'],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}