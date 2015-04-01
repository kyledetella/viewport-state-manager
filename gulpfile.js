var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var reporter = require('jshint-stylish');
var size = require('gulp-size');
var bump = require('gulp-bump');
var source = require('vinyl-source-stream');

var SRC = './src/viewport-state-manager.js';

gulp.task('compile', function () {
  return browserify(SRC, {standalone: 'ViewportStateManager'})
  .bundle()
  .pipe(source('viewport-state-manager.js'))
  .pipe(gulp.dest('./dist'))
});

gulp.task('build:src', ['test', 'compile'], function () {
  return gulp.src('dist/viewport-state-manager.js')
    .pipe(size({showFiles: true}))
    .pipe(uglify())
    .pipe(rename('viewport-state-manager.min.js'))
    .pipe(size({showFiles: true}))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function () {
  gulp.src(SRC)
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter(reporter));
});

gulp.task('bump', function (){
  gulp.src('./package.json')
  .pipe(bump({ type:'point' }))
  .pipe(gulp.dest('./'));
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
