var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

//###############################################################################
// high level tasks
//###############################################################################

gulp.task('build', ['build:dev']);

gulp.task('build:dev', function(callback) {
  //['clean', 'build:html', 'build:css', 'build:assets']
  runSequence('clean', ['build:html:dev', 'build:css', 'build:javascript:dev', 'build:assets'], callback);
});
gulp.task('build:prod',function(callback) {
 runSequence('clean', ['build:html:prod', 'build:css', 'build:javascript:prod', 'build:assets'], callback);
}); //TODO: compress/minify/uglify/uncss http://www.mikestreety.co.uk/blog/an-advanced-gulpjs-file

gulp.task('build:html:dev', function(callback) {
    //['build:html:compile-templates', 'wiredep:html', 'build:html:beautify']
    runSequence('build:html:compile-templates', 'wiredep:html', 'build:html:beautify', callback);
});

gulp.task('build:html:prod', function(callback) {
    //['build:html:compile-templates', 'wiredep:html', 'build:html:beautify']
    runSequence('build:html:compile-templates', 'build:html:beautify', callback);
});

gulp.task('build:html:beautify', function() {
  return gulp.src(c.files.html)
    .pipe($.jsbeautifier(c.jsbeautifier.html))
    .pipe(gulp.dest(c.paths.target.base));
});

gulp.task('build:javascript:dev', function() {
  return gulp.src(c.file.source.mainJavaScript)
    .pipe(gulp.dest(c.paths.target.javascript));
});

gulp.task('build:javascript:prod', function(callback) {
    
    var jsSources = [
      c.file.source.mainJavaScript
    ];
  
    return gulp.src(mainBowerFiles().concat(jsSources))
      .pipe($.filter('*.js'))
      .pipe($.concat('main.js'))
    	.pipe($.uglify())
	    .pipe(gulp.dest(c.paths.target.javascript));
});


gulp.task('build:css', ['build:css:compile-styles']);

gulp.task('build:assets', ['build:assets:others', 'build:assets:images', 'build:assets:fonts']);


