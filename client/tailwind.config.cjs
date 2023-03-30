/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textBase: "#333333",
        bgColor: "F7EDD6",
        // textSecondary: "#786A78",
      },
      height: {
        93: "93vh",
      },
      width: {
        93: "93vw",
      },
    },
    letterSpacing: { normal: ".02" },
    fontFamily: {
      second: ["Albert Sans", "sans-serif"],
    },
    backgroundColor: {
      primary: "#FFFDFE",
      secondary: "#F7EDD6",
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#95B9F4",
          secondary: "#B9D1FB",
          accent: "#DEDFA6",
          neutral: "#333",
          info: "#36454F",
          success: "#81CFD1",
          warning: "#EFD7BB",
          error: "#E58B8B",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
