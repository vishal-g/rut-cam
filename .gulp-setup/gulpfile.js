"use strict";

const settings = require("./settings.json");

const themePath = settings.themePath;
const pluginPath = settings.pluginPath;

const browsersync = require("browser-sync").create();
const livereload = require("gulp-livereload");
var reload = browsersync.reload;

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const tailwindcss = require("tailwindcss");
const tailwindConfig = require("tailwindcss").Config;

/*############################################################################*/
// Theme related tasks
/*############################################################################*/

// Theme CSS task
gulp.task("theme-css", () => {
  console.log("inside themecss");
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
          tailwindcss(tailwindConfig),
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
    .src([`${themePath}/assets/src/js/app.js`])
    .pipe(gulp.dest(`${themePath}/assets/build/js`))
    .pipe(browsersync.stream())
    .pipe(livereload());
});

// == Browser-sync task
gulp.task("browser-sync", function (done) {
  browsersync.init({
    // server: "./",
    // startPath: "webpage/index.html", // After it browser running [File path set]
    // //    browser: 'chrome',
    proxy: "https://rutgers.test/staff/",
  });
  gulp.watch([`${themePath}/**/*.html`]).on("change", reload);

  done();
});

// gulp watch
gulp.task("theme-watch", () => {
  livereload.listen();
  // gulp.watch(["./postcss.config.js"], gulp.series("copy-postcss-config"));
  gulp.watch(
    [
      `${themePath}/assets/src/css/**/*.*`,
      `${themePath}/**/*.html`,
      `${themePath}/**/*.php`,
      `${themePath}/**/*.js`,
    ],
    gulp.series("theme-css")
  );

  gulp.watch([`${themePath}/assets/src/js/**/*`], gulp.series("theme-js"));
  gulp.watch(
    [`${themePath}/assets/src/fonts/*`],
    gulp.series("theme-webfonts")
  );
  gulp.watch([`${themePath}/assets/src/images/*`], gulp.series("theme-images"));
});

/*############################################################################*/
// Plugin related tasks
/*############################################################################*/

// Plugin npm watch - Run from NPM Script

// Plugin CSS task
gulp.task("plugin-css", () => {
  return gulp
    .src(
      [
        `${pluginPath}/assets/src/css/app.pcss`,
        `${pluginPath}/assets/src/css/editor-style.pcss`,
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
        require("tailwindcss"),
        require("autoprefixer"),
      ])
    )
    .pipe(
      rename({
        extname: ".css",
      })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${themePath}/assets/build/css`))
        .pipe(browsersync.stream())
        .pipe(livereload())
    );
});

// Plugin Assets tasks - Common Css
gulp.task("plugin-assets-vendors", () => {
  return gulp
    .src(`${pluginPath}/src/assets/vendors/**/*.*`)
    .pipe(gulp.dest(`${pluginPath}/build/assets/vendors`));
});

// Plugin Assets tasks - Common Js
gulp.task("plugin-assets-vendors", () => {
  return gulp
    .src(`${pluginPath}/src/assets/js/**/*.*`)
    .pipe(gulp.dest(`${pluginPath}/build/assets/js`));
});

// Plugin Assets tasks - Vendors
gulp.task("plugin-assets-vendors", () => {
  return gulp
    .src(`${pluginPath}/src/assets/vendors/**/*.*`)
    .pipe(gulp.dest(`${pluginPath}/build/assets/vendors`));
});

/*############################################################################*/
// Common tasks
/*############################################################################*/

gulp.task("default", gulp.series("theme-css", "browser-sync", "theme-watch"));
