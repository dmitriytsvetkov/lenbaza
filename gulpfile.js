"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var del = require("del");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var jsmin = require("gulp-uglify");

var server = require("browser-sync").create();

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
