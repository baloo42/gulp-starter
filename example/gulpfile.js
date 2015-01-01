var gulp = require('gulp');

// project config
var c = require('./gulp/config');

var requireDir = require('require-dir');
var dir = requireDir('./gulp/tasks');


gulp.task('default', ['devtools:browser-sync']);