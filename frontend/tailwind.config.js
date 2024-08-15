/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E3B5F",
        secondary: "#F08331",
      },
      backgroundImage: {
        hero: "url('../public/images/just-eat.jpg')",
      },
    },
  },
  plugins: [],
};
