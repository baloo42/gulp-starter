var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);
var wiredep = require('wiredep').stream;

// inject bower components
gulp.task('wiredep:html', function () {
  return gulp.src(c.files.html)
    .pipe(wiredep())
    .pipe(gulp.dest(c.paths.target.base));
});

// gulp.task('test', function() {
//   //TODO gulp-inject
//   var bowerFiles = require('main-bower-files')();
  
//   gulp.src(bowerFiles)
//     .pipe($.filter(c.files.javascriptRecursive))
//     .pipe($.print())
//     .pipe(c.target.javascript)
// });