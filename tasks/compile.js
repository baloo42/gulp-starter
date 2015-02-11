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
            var viewDataFile, globalData;
            try {
                globalData = JSON.parse(fs.readFileSync(c.file.source.templateDataGlobal));
                viewDataFile = c.file.source.templateData(file.path);    
            }catch(err){
                console.log("parsing global data failed -", viewDataFile,  err);
            }
            
            
            if (fs.existsSync(viewDataFile)) {
                var mergedData;
                try {
                    var viewData = JSON.parse(fs.readFileSync(viewDataFile));
                    mergedData = deepmerge(globalData, viewData);
                } catch(err) {
                    console.log("merging template data failed -", viewDataFile,  err);
                }

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
        .pipe($.debug())
        .pipe($.sourcemaps.init(c.sourceMaps.init))
        .pipe($.sass(c.sass))
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
        .pipe($.sourcemaps.write(
            c.paths.target.cssMapsRelative, c.sourceMaps.write))
        .pipe(gulp.dest(c.paths.target.css));
});


gulp.task('build:css:maps', function(){
   return gulp.src(c.file.source.maps)
        .pipe($.debug())
        .pipe();
});