var gulp = require('gulp');

// project config
var c = require('./gulp/config');

var requireDir = require('require-dir');
var dir = requireDir('./gulp/tasks');
var gm = require("gm");

gulp.task('scaleimages', function() {
    // gm('target/img/fahrschule-kiy-logo.jpg')
    //     .resize(null, 92)
    //     .write('target/img/fahrschule-kiy-logo.default.jpg', function(err) {
    //         if(err){
    //             console.log(err);    
    //         } else {
    //             console.log('done');
    //         }
    //     });
    // gm('target/img/fahrschule-kiy-logo.jpg')
    //     .resize(null, 60)
    //     .write('target/img/fahrschule-kiy-logo.xs.jpg', function(err) {
    //         if(err){
    //             console.log(err);    
    //         } else {
    //             console.log('done');
    //         }
    //     });
        
     gm('target/img/fritz-kiy-square.jpg')
        .resize(null, 200)
        .write('target/img/fritz-kiy-square.jpg', function(err) {
            if(err){
                console.log(err);    
            } else {
                console.log('done');
            }
        });
});

gulp.task('default', ['devtools:browser-sync']);