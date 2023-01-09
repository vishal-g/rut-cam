"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
// const cssnano = require("cssnano");
// const concat = require('gulp-concat');
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
// const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
// var sass = require('gulp-sass')(require('sass'));
const livereload = require("gulp-livereload");
const notify = require("gulp-notify");
var reload = browsersync.reload;

// == Browser-sync task
gulp.task("browser-sync", function (done) {
    browsersync.init({
        // server: "./",
        // startPath: "webpage/index.html", // After it browser running [File path set]
        // //    browser: 'chrome',
        proxy: "https://rutgers.test"
    });
    gulp.watch(["./**/*.html"]).on("change", reload); // [File path set]
    done();
});
// == Browser-sync task

// CSS task
gulp.task("css", () => {
    return gulp
        .src(["./assets/src/css/app.pcss"], {"allowEmpty": true})
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(
            rename({
                extname: ".css",
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./assets/build/css"))
        .pipe(
            notify({
                message: "main PCSS processed",
            })
        )
        .pipe(browsersync.stream())
        .pipe(livereload());
});

// Webfonts task
gulp.task("webfonts", () => {
    return gulp
        .src("./assets/src/fonts/**/*.*")
        .pipe(gulp.dest("./assets/build/fonts"));
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
    gulp.series("css", "js", "webfonts", "browser-sync", () => {
        livereload.listen();
        gulp.watch(
            ["assets/src/css/**/*.*", "theme.json",  "**/*.html", "**/*.php", "**/*.js"],
            gulp.series("css")
        );
        gulp.watch(["assets/src/js/**/*"], gulp.series("js"));
        gulp.watch(["assets/src/fonts/*", "theme.json"], gulp.series("webfonts"));
    })
);