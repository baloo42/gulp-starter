var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);
var runSequence = require('run-sequence');


gulp.task('build:assets:images', function(callback) {
  runSequence('build:assets:images:minify', 'build:assets:images:modify', callback);
});


gulp.task('build:assets:images:minify', function() {
  return gulp.src(c.files.source.images)
      .pipe($.newer(c.paths.target.images))
      .pipe($.imagemin(c.imagemin))
      .pipe(gulp.dest(c.paths.target.images));
});
gulp.task('build:assets:images:modify', function() {
  // do nothing
});

gulp.task('build:assets:fonts', function() {
  return gulp.src(require('main-bower-files')().concat(c.files.source.fonts))
    .pipe($.filter(c.files.allFonts))
    .pipe($.flatten())
    .pipe(gulp.dest(c.paths.target.fonts));
});

gulp.task('build:assets:others', function() {
  return gulp.src(c.files.source.assets)
    .pipe(gulp.dest(c.paths.target.base));
});