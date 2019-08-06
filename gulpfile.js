const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref'); // need for minifyCss

const gulpIf = require('gulp-if'); // dont need i think so


// Copy html
gulp.task('copyHtml', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});



// Compile to sass
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});



// Minify CSS
gulp.task('minifyCss', function () {
  return gulp.src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
});


// Concat and minify JS
gulp.task('scripts', function () {
  gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});



//Optimize Images
gulp.task('imageMin', function () {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});



//Watch sass & serve
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './'
  });

  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
});