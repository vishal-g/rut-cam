"use strict";

/*
Inital Settings to be done 
- create asymbolic link at the wp root directory
 ln -s /Users/vishaal/code/wp-sites/test-2/.gulp-setup/node_modules /Users/vishaal/code/wp-sites/test-2/node_modules
- change browsersync domain
- run "npm run plugin-start"
- run "gulper" in a separate terminal tab
*/

const settings = require("./settings.json");

const themePath = settings.themePath;
const pluginPath = settings.pluginPath;

const tailwindConfigTheme = require("./tailwind.config");
const themeJson = require(settings.themeJson);

// Disable this line if possibility of different styling for plugin needed
// const tailwindConfigPlugin = tailwindConfigTheme;

console.log(settings.pluginUsesThemeStyle);

// TO enable different styling for plugin (currently disabled since vscode was not giving prompts for tailwind classes)

let tailwindConfigPlugin = {};
let pluginJson = {};

if (settings.pluginUsesThemeStyle === true) {
  tailwindConfigPlugin = require("./tailwind.config");
  pluginJson = require(settings.themeJson);
} else {
  tailwindConfigPlugin = require("./plugin.tailwind.config");
  pluginJson = require(settings.pluginJson);
}

const gulp = require("gulp");

const browsersync = require("browser-sync").create();
const livereload = require("gulp-livereload");
var reload = browsersync.reload;

const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const tailwindcss = require("tailwindcss");

// == Browser-sync task
gulp.task("browser-sync", function (done) {
  browsersync.init({
    // server: "./",
    // startPath: "webpage/index.html", // After it browser running [File path set]
    // //    browser: 'chrome',
    proxy: "https://test-2.test/",
  });
  gulp.watch([`${themePath}/**/*.html`]).on("change", reload);

  done();
});

/*############################################################################*/
// Theme related tasks
/*############################################################################*/

// Theme CSS task
gulp.task("theme-css", () => {
  return (
    gulp
      .src(
        [
          `${themePath}/assets/src/css/app.pcss`,
          `${themePath}/assets/src/css/editor-style.pcss`,
        ],
        {
          allowEmpty: true,
        }
      )
      .pipe(sourcemaps.init())
      // .pipe(
      //   notify({
      //     message: "sourcemaps inited",
      //   })
      // )
      .pipe(
        postcss([
          require("postcss-import-ext-glob"),
          require("postcss-import"),
          require("postcss-extend"),
          require("tailwindcss/nesting"),
          tailwindcss({
            config: tailwindConfigTheme,
          }),
          require("autoprefixer"),
        ])
      )
      .pipe(
        rename({
          extname: ".css",
        })
      )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${themePath}/assets/build/css`))
      .pipe(browsersync.stream())
      .pipe(livereload())
  );
});

// Webfonts task
gulp.task("theme-webfonts", () => {
  return gulp
    .src(`${themePath}/assets/src/fonts/**/*.*`)
    .pipe(gulp.dest(`${themePath}/assets/build/fonts`));
});

// Webfonts task
gulp.task("theme-images", () => {
  return gulp
    .src(`${themePath}/assets/src/images/**/*.*`)
    .pipe(gulp.dest(`${themePath}/assets/build/images`));
});

// Theme js script
gulp.task("theme-js", () => {
  return gulp
    .src([`${themePath}/assets/src/js/**/*.js`])
    .pipe(gulp.dest(`${themePath}/assets/build/js`))
    .pipe(browsersync.stream())
    .pipe(livereload());
});

/*############################################################################*/
// Plugin related tasks
/*############################################################################*/

// Plugin npm watch - Run from NPM Script

//---------------------------------------------------------------------
// Plugin Block Tasks
//----------------------------------------------------------------------

// Plugin Block Task - CSS

gulp.task("plugin-block-css", () => {
  return gulp
    .src([`${pluginPath}/src/blocks/**/*.pcss`], {
      allowEmpty: true,
    })
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        require("postcss-import-ext-glob"),
        require("postcss-import"),
        require("postcss-extend"),
        require("tailwindcss/nesting"),
        tailwindcss({
          config: tailwindConfigPlugin,
        }),
        require("autoprefixer"),
      ])
    )
    .pipe(
      rename({
        extname: ".css",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${pluginPath}/src/blocks`));
});

// Reload browser afer Plugin Block Task - CSS

gulp.task(
  "plugin-block-css-watch",
  gulp.series("plugin-block-css", function (done) {
    browsersync.reload();
    done();
  })
);

//---------------------------------------------------------------------
// Plugin Common Tasks
//----------------------------------------------------------------------

// Plugin Assets tasks - Common Css
gulp.task("plugin-assets-css", () => {
  return gulp
    .src(
      [
        `${pluginPath}/src/assets/css/app.pcss`,
        `${pluginPath}/src/assets/css/editor-style.pcss`,
      ],
      {
        allowEmpty: true,
      }
    )
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        require("postcss-import-ext-glob"),
        require("postcss-import"),
        require("postcss-nested-ancestors"),
        require("tailwindcss/nesting"),
        require("postcss-extend"),
        require("tailwindcss")(tailwindConfigPlugin),
        require("autoprefixer"),
      ])
    )
    .pipe(
      rename({
        extname: ".css",
      })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${pluginPath}/src/assets/build/css`))
        .pipe(browsersync.stream())
        .pipe(livereload())
    );
});

// Plugin Assets tasks - Common Js
gulp.task("plugin-assets-js", () => {
  return gulp
    .src(`${pluginPath}/src/assets/js/**/*.*`)
    .pipe(gulp.dest(`${pluginPath}/build/assets/js`));
});

// Plugin Assets tasks - Vendor files
gulp.task("plugin-assets-vendors", () => {
  return gulp
    .src(`${pluginPath}/src/assets/vendors/**/*.*`)
    .pipe(gulp.dest(`${pluginPath}/build/assets/vendors`));
});

/*############################################################################*/
// Common tasks
/*############################################################################*/

//=============================================================================
// Default Task
//=============================================================================

gulp.task(
  "default",
  gulp.series(
    "theme-css",
    "plugin-block-css",
    "plugin-assets-css",
    "plugin-assets-js",
    "plugin-assets-vendors",
    "browser-sync",
    () => {
      livereload.listen();

      //----------------------------------------------------------------------------
      // Theme Related Watch
      //-----------------------------------------------------------------------------

      // gulp.watch(["./postcss.config.js"], gulp.series("copy-postcss-config"));
      gulp.watch(
        [
          `${themePath}/assets/src/css/**/*.*`,
          `${themePath}/**/*.html`,
          `${themePath}/**/*.php`,
        ],
        gulp.series("theme-css")
      );

      gulp.watch([`${themePath}/assets/src/js/**/*`], gulp.series("theme-js"));
      gulp.watch(
        [`${themePath}/assets/src/fonts/*`],
        gulp.series("theme-webfonts")
      );
      gulp.watch(
        [`${themePath}/assets/src/images/*`],
        gulp.series("theme-images")
      );

      //----------------------------------------------------------------------------
      // Plugin Related Watch
      //-----------------------------------------------------------------------------

      gulp.watch(
        [
          `${pluginPath}/src/blocks/**/*.pcss`,
          // `${pluginPath}/**/*.html`,
          // `${pluginPath}/**/*.php`,
        ],
        { ignoreInitial: false },
        gulp.series("plugin-block-css-watch")
      );

      // gulp.watch(
      //   [`${pluginPath}/build/blocks/**/*.css`],
      //   gulp.series("plugin-block-css-built")
      // );

      gulp.watch(
        [`${pluginPath}/src/assets/css/**/*`],
        gulp.series("plugin-assets-css")
      );

      gulp.watch(
        [`${pluginPath}/src/assets/js/**/*`],
        gulp.series("plugin-assets-js")
      );
      gulp.watch(
        [`${pluginPath}/src/assets/vendors/**/*.*`],
        gulp.series("plugin-assets-vendors")
      );
    }
  )
);
