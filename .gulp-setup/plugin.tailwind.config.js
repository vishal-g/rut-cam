const settings = require("./settings.json");
console.log("Inside plugin.tailwind.config.js");

const pluginPath = settings.pluginPath;

if (settings.pluginUsesThemeStyle === true) {
  theme = require(settings.themeJson);
} else {
  theme = require(settings.pluginJson);
}

// const theme = require(`${pluginPath}/plugin.json`);

console.log(theme.settings.color.palette);

const themeStringified = JSON.stringify(theme);
const parsedThemeJson = JSON.parse(themeStringified);

const tailpress = require("tspace-tailwind");

themeToTailwindConfig = tailpress.configMapper(parsedThemeJson);

// console.log(themeToTailwindConfig);

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    `${pluginPath}/*.php`,
    `${pluginPath}/*.html`,
    `${pluginPath}/theme.json`,
    `${pluginPath}/safelist.txt`,
    `${pluginPath}/**/*.php`,
    `${pluginPath}/**/*.html`,
    `${pluginPath}/assets/src/css/*.css`,
    `${pluginPath}/assets/src/js/*.js`,
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
