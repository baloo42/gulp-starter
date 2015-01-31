var gulp = require('gulp');

// project config
var c = require('../config');

// task dependencies
var $ = require('gulp-load-plugins')(c.gulpLoad);
var browserSync = require('browser-sync');


var changeEvent = function(evt) {
    $.util.log('File', $.util.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + c.paths.source.base + ')/'), '')),
        'was', $.util.colors.magenta(evt.type));
};

gulp.task('watch', ['build'], function() {
    gulp.watch('bower.json', ['wiredep']).on('change', function(evt) {
        changeEvent(evt);
    });

    var mvwhatever = [
        c.files.templateData,
        c.files.viewTemplates,
        c.files.layoutTemplates,
        c.files.componentTemplates
    ];
    
    var onChange = function(evt) {
        changeEvent(evt);
    };
        
    gulp.watch(mvwhatever, ['build:html', browserSync.reload])
        .on('change', onChange);

    gulp.watch(c.files.styles, ['build:css', browserSync.reload])
        .on('change', onChange);

    gulp.watch(c.files.source.javascript, ['build:javascript', browserSync.reload])
        .on('change', onChange);
    
    gulp.watch(c.files.source.images, ['build:assets:images', browserSync.reload])
        .on('change', onChange);
});