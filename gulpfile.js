var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var reporter = require('jshint-stylish');
var size = require('gulp-size');

var SRC = './src/viewport-state-manager.js';

/* Build source */

gulp.task('compile', function () {
  gulp.src(SRC)
  .pipe(browserify({
    standalone: 'ViewportStateManager'
  }))
  .pipe(size())
  .pipe(gulp.dest('./dist'))
});

gulp.task('build:src', ['test', 'compile'], function () {
  gulp.src('dist/viewport-state-manager.js')
  .pipe(uglify())
  .pipe(rename('viewport-state-manager.min.js'))
  .pipe(size())
  .pipe(gulp.dest('./dist'));
});

gulp.task('test', function () {
  gulp.src(SRC)
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter(reporter));
});

gulp.task('default', ['build:src', 'build:examples']);

/* Build examples */
gulp.task('build:examples', function () {
  var exampleDir = './examples/browserify/js/';

  gulp.src(exampleDir + 'vsm-browserify-example.js')
  .pipe(browserify())
  .pipe(rename('vsm-browserify-example.built.js'))
  .pipe(gulp.dest(exampleDir));
});
