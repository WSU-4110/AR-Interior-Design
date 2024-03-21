/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      'light': '#FAFAFA',
      'dark': '#212121',
      'darkAccentColor': '#686963',
      'primaryColor': '#DB5461',
      'secondaryColor': '#8AA29E',
      'supportingColor': '#E3F2FD',
      'hyperlinkColor': '#1E88E5',
      'lightTextColor': '#686963',
      },
    },
  },
  plugins: [],
};
