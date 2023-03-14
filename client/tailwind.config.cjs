/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textBase: "#333",
        // textSecondary: "#786A78",
      },
    },
    letterSpacing: { normal: ".02" },
    fontFamily: {
      second: ["Albert Sans", "sans-serif"],
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
          // textSecondary: "#786A78",
          info: "#93E7FB",
          success: "#81CFD1",
          warning: "#EFD7BB",
          error: "#E58B8B",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
