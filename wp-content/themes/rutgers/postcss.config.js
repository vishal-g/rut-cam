module.exports = {
  plugins: [
    require("postcss-import-ext-glob"),
    require("postcss-import"),
    require("postcss-nested-ancestors"),
    require("tailwindcss/nesting"),
    require("postcss-extend"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
