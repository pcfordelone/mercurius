/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url(/src/assets/home-background.jpg)",
      },
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      colors: {
        orange: {          
          500: "#D35500",
          600: "#D07120",
          700: "#E67F23",
        },
        yellow: {
          500: "#FDD74C",
        },
        green: {
          300: "#FBA94C",
        },
        pink: {
          300: "#F75A68",
        },
        gray: {
          100: "#EAEAEA",
          200: "#D6D6D6",
          300: "#BABABA",
          400: "#9E9E9E",
          500: "#323238",
          600: "#606060",
          700: "#323332",
          800: "#202120",
          900: "#161616",
        },
        black: "#000000",
        white: "#FFFFFF"
      },
    },
  },
  plugins: [],
};
