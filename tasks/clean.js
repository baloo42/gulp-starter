var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')();
var vinylPaths  = require('vinyl-paths');


gulp.task('clean', ['clean:html']);

gulp.task('clean:html', function() {
    return gulp.src(c.files.html)
         .pipe(vinylPaths($.del));
});