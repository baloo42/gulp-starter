var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


/* 

Print all available tasks.

Output is grouped by tasks and their subtasks devided by ':'. Tasks which
contain 'helper' are ignored.

*/
gulp.task('help', $.taskListing.withFilters(/:/, 'helper'));