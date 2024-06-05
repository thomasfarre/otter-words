/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        baloo: ["'Baloo 2'", "sans-serif"],
      },
      colors: {
        brown: "#481A1A",
        "brown-hover": "#930808",
        green: "#00C514",
        "green-hover": "#2ce83f",
      },
      borderRadius: {
        card: "3rem",
        btn: "3.75rem",
      },
      fontSize: {
        title: "2.5rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

