/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        NAVY: {
          1: "#1D0263",
          2: "#2B0792",
          3: "#360BC0",
          4: "#3F2CEB",
          5: "#4A58F6",
        },
        YELLOW: {
          1: "#937D2C",
          2: "#AC9233",
          3: "#C4A63A",
          4: "#DDBB42",
          5: "#F5D049",
        },
        BLACK: "#0B0A0A",
        WHITE: "#FFFFFF",
        GRAY: {
          2: "#F9F9F9",
          3: "#BFBFBF",
          4: "#9B9B9B",
          5: "#777676",
          6: "#1A1A1A",
        },
      },
      fontFamily: {
        DMSans: ["DM Sans"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
