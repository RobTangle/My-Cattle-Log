/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        color_bg: "#2a2a2e",
        white: "#ffffff",
        brown: "#5C3D2E",
        light_brown: "#865439",
        green: "#146356",
        light_green: "#A3DA8D",
        beige: "#F3C892",
        color_light: "#FFF1BD",
        gray: "#3C4048",
      },
      backgroundImage: {
        landing:
          "url('https://res.cloudinary.com/dfbxjt69z/image/upload/v1667056183/cattle/pexels-pixabay-162240_akbobi.jpg')",
      },
      fontFamily: {
        sans: ["Helvetica", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
