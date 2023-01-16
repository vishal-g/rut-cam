const theme = require("./theme.json");
const themeStringified = JSON.stringify(theme);
const parsedThemeJson = JSON.parse(themeStringified);

const tailpress = require("tspace-tailwind");

themeToTailwindConfig = tailpress.configMapper(parsedThemeJson);

console.log(themeToTailwindConfig);

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./*.php",
    "./*.html",
    "./theme.json",
    "./safelist.txt",
    "./**/*.php",
    "./**/*.html",
    "./assets/src/css/*.css",
    "./assets/src/js/*.js",
    // './safelist.txt'
  ],
  theme: {
    extend: themeToTailwindConfig,

    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  // ...(process.env.NODE_ENV == 'development') && {
  //     safelist: [
  //         { pattern: /.*/ },
  //     ],
  // },
  // plugins: [
  //     tailpress.tailwind
  // ]
};
