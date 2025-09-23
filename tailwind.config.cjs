/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ktav: ["MyCustomFont", "sans-serif"], // now usable with class "font-ktav"
      },
    },
  },
  plugins: [],
};
