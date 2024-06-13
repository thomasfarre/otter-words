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
        fishmove: {
          "0%": { transform: "translateX(-100%) scaleX(-1)" },
          "49.9%": { transform: "translateX(100vw) scaleX(-1)" },
          "50%": { transform: "translateX(100vw) scaleX(1)" },
          "100%": { transform: "translateX(-100%) scaleX(1)" },
        },
        swim: {
          "0%, 50%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-5px)" },
          "75%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        fishmove: "fishmove 45s linear infinite",
        swim: "swim 2s linear infinite",
      },
    },
  },
  plugins: [],
};
