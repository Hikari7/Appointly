/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#95B9F4",

          secondary: "#B9D1FB",

          accent: "#DEDFA6",

          neutral: "#1C1C1C",

          "base-100": "#FFFFFF",

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
