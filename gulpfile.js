var gulp = require("gulp");
var minifycss = require("gulp-minify-css");
var htmlmin = require("gulp-htmlmin");
var htmlclean = require("gulp-htmlclean");

gulp.task("minify-css", function () {
  return gulp
    .src("./public/**/*.css")
    .pipe(minifycss())
    .pipe(gulp.dest("./public"));
});

gulp.task("minify-html", function () {
  return gulp
    .src("./public/**/*.html")
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("build", gulp.parallel("minify-html", "minify-css"));
