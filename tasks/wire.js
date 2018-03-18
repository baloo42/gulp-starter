var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);
var wiredep = require('wiredep').stream;

// inject bower components
gulp.task('wiredep:html', function () {
  return gulp.src(c.files.html)
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep())
    .pipe(gulp.dest(c.paths.target.base));
});
