'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean')
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
var bulkSass = require('gulp-sass-bulk-import');

gulp.task('sass', function () {
  gulp.src('./assets/css/custom.scss')
    .pipe(bulkSass())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename('custom.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/css/**/*.scss', ['sass']);
});

gulp.task('clean', function() {
  return gulp.src('static/uploads/')
    .pipe(clean({force: true}))
    .pipe(gulp.dest('dist'));
});
