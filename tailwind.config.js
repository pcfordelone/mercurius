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
          500: "#",
          600: "#",
          700: "#",
        },
        yellow: {
          500: "#",
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
          300: "#8D8D99",
          500: "#323238",
          600: "#29292E",
          700: "#121214",
          800: "#202120",
          900: "#09090A",
        },
        black: "#000000",
        white: "#FFFFFF"
      },
    },
  },
  plugins: [],
};
