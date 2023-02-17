const settings = require("./settings.json");

const themePath = settings.themePath;

const theme = require(`${themePath}/theme.json`);

const themeStringified = JSON.stringify(theme);
const parsedThemeJson = JSON.parse(themeStringified);

const tailpress = require("tspace-tailwind");

themeToTailwindConfig = tailpress.configMapper(parsedThemeJson);

console.log(themeToTailwindConfig);

const contentToWatch = [
  `${themePath}/*.php`,
  `${themePath}/*.html`,
  `${themePath}/theme.json`,
  `${themePath}/safelist.txt`,
  `${themePath}/**/*.php`,
  `${themePath}/**/*.html`,
  `${themePath}/assets/src/css/*.css`,
  `${themePath}/assets/src/js/*.js`,
];

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [...contentToWatch],
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
