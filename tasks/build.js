var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);
var runSequence = require('run-sequence');

gulp.task('build', ['build:dev']);

gulp.task('build:dev', function(callback) {
  //['clean', 'build:html', 'build:css', 'build:assets']
  runSequence('clean', ['build:html', 'build:css', 'build:javascript', 'build:assets'], callback);
});
gulp.task('build:prod', ['build-dev']); //TODO: compress/minify/uglify/uncss http://www.mikestreety.co.uk/blog/an-advanced-gulpjs-file


gulp.task('build:html', function(callback) {
    //['build:html:compile-templates', 'wiredep:html', 'build:html:beautify']
    runSequence('build:html:compile-templates', 'wiredep:html', 'build:html:beautify', callback);
});

gulp.task('build:html:beautify', function() {
  return gulp.src(c.files.html)
    .pipe($.jsbeautifier(c.jsbeautifier.html))
    .pipe(gulp.dest(c.paths.target.base));
});

gulp.task('build:javascript', function() {
  return gulp.src(c.file.source.mainJavaScript)
    .pipe(gulp.dest(c.paths.target.javascript));
});

gulp.task('build:css', ['build:css:compile-styles']);

gulp.task('build:assets', ['build:assets:others', 'build:assets:images', 'build:assets:fonts']);

gulp.task('build:assets:others', function() {
  return gulp.src(c.files.source.assets)
    .pipe(gulp.dest(c.paths.target.base));
});

gulp.task('build:assets:images', function() {
  return gulp.src(c.files.source.images)
    .pipe($.cache($.imagemin(c.imagemin)))
    .pipe(gulp.dest(c.paths.target.images));
});

gulp.task('build:assets:fonts', function() {
  return gulp.src(require('main-bower-files')().concat(c.files.source.fonts))
    .pipe($.filter(c.files.allFonts))
    .pipe($.flatten())
    .pipe(gulp.dest(c.paths.target.fonts));
});
