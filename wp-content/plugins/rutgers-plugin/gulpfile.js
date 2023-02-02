"use strict";

const gulp = require("gulp");
const notify = require("gulp-notify");

// CSS task
gulp.task("css", () => {
  return gulp
    .src(["./src/assets/css/*.pcss"], {
      allowEmpty: true,
    })
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(
      rename({
        extname: ".css",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(
      notify({
        message: "sourcemaps written",
      })
    )
    .pipe(gulp.dest("./build/assets/css/"));
});

// Webfonts task
gulp.task("webfonts", () => {
  return gulp
    .src("./assets/src/fonts/**/*.*")
    .pipe(gulp.dest("./assets/build/fonts"));
});

// Webfonts task
gulp.task("images", () => {
  return gulp
    .src("./assets/src/images/**/*.*")
    .pipe(gulp.dest("./assets/build/images"));
});

// Transpile, concatenate and minify scripts
gulp.task("js", () => {
  return (
    gulp
      .src(["assets/src/js/app.js", "assets/src/js/script.js"])
      // .pipe(plumber())

      // folder only, filename is specified in webpack config
      // .pipe(concat("app.js"))
      .pipe(gulp.dest("./assets/build/js"))
      .pipe(browsersync.stream())
      .pipe(livereload())
  );
});

gulp.task(
  "default",
  gulp.series("css", "js", "webfonts", "images", "browser-sync", () => {
    livereload.listen();
    gulp.watch(
      [
        "assets/src/css/**/*.*",
        "theme.json",
        "**/*.html",
        "**/*.php",
        "**/*.js",
      ],
      gulp.series("css")
    );
    gulp.watch(["assets/src/js/**/*"], gulp.series("js"));
    gulp.watch(["assets/src/fonts/*", "theme.json"], gulp.series("webfonts"));
    gulp.watch(["assets/src/images/*"], gulp.series("images"));
  })
);
