"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const del = require("del");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const jsmin = require('gulp-uglify-es').default;

const server = require("browser-sync").create();

gulp.task("clean", function() {
  return del("build");
});

gulp.task("minHtml", function() {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin())
    .pipe(gulp.dest("build"));
})

gulp.task("minJs", function() {
  return gulp.src("source/js/**/*.js")
    .pipe(jsmin())
    .pipe(gulp.dest("build/js"));
})

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gulp.dest("build/css"))
});

gulp.task("minCss", function() {
  return gulp.src("build/css/style.css")
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css", "minCss", "refresh"));
  gulp.watch("source/*.html", gulp.series("minHtml", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("minJs", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "minHtml",
  "minCss",
  "minJs",
  "images"
));
gulp.task("start", gulp.series("build", "server"));
