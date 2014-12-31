var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);
var fs = require('fs');
var deepmerge = require('deepmerge');




/*

Compiles the view twig templates using global and view specific data.

*/
gulp.task('build:html:compile-templates', function() {
    return gulp.src(c.files.viewTemplates)
        .pipe($.data(function(file) {
            
            var globalData = JSON.parse(fs.readFileSync(c.file.source.templateDataGlobal));
            var viewDataFile = c.file.source.templateData(file.path);
            
            if (fs.existsSync(viewDataFile)) {
                var viewData = JSON.parse(fs.readFileSync(viewDataFile));
                var mergedData = deepmerge(globalData, viewData);

                return mergedData;
            }
            else {
                return globalData;
            }
        }))
        .pipe($.twig(c.twig))
        .pipe(gulp.dest(c.paths.target.base));
});



gulp.task('build:css:compile-styles', function() {
    return gulp.src(c.file.source.mainStyle)
        .pipe($.sourcemaps.init(c.sourceMaps.init))
        .pipe($.sass(c.sass))
        .pipe($.sourcemaps.write(
            c.paths.target.cssMapsRelative, c.sourceMaps.write))
        .pipe(gulp.dest(c.paths.target.css));
});