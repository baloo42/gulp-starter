var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);


gulp.task('check:data', function(){
    return gulp.src(c.files.templateData)
        //.pipe($.debug())
        .pipe($.jsonLint())
        .pipe($.jsonLint.report(c.lintreporter));
});


gulp.task('check:gulp'), function(){
    return gulp.src("./gulp/**/*.js")
        .pipe($.jsonLint())
        .pipe($.jsonLint.report(c.lintreporter));
}