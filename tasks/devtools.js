var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var browserSync = require('browser-sync');


// TODO: serve static

gulp.task('devtools:browser-sync', ['watch'], function() {
    browserSync(c.browserSync);
});