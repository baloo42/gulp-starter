var path = require('path');

var htmlFile = ".html";
var jsonFile = ".json";
var javascriptFile = ".js";
var twigFile = ".twig";
var styleFile = ".scss";
var fontFile = ".{eot,svg,ttf,woff}";

var all = "*";
var allTwig = all + twigFile;
var allFonts = all + fontFile;
var allJavascript = all + javascriptFile;
var allJson = all + jsonFile;
var allStyles = all + styleFile;
var allHtml = all + htmlFile;

var recursive = "**/" + all;
var twigRecursive = recursive + twigFile;
var javascriptRecursive = recursive + javascriptFile;
var jsonRecursive = recursive + jsonFile;
var stylesRecursive = recursive + styleFile;
var htmlRecursive = recursive + htmlFile;
var fontsRecursive = recursive + fontFile;

var paths = {
    source: {
        base: "./src",

        get viewTemplates() {
            return this.base + "/views";
        },
        get layoutTemplates() {
            return this.base + "/layout";
        },
        get componentTemplates() {
            return this.base + "/components";
        },
        get templateData() {
            return this.base + "/data";
        },
        
        get assets() {
            return this.base + "/assets";
        },
        
        get styles() {
            return this.base + "/styles";
        },
        get images() {
            return this.base + "/images";
        },

        get fonts() {
            return this.base + "/fonts";
        },
        
        get javascript() {
            return this.base + "/javascript";
        }
    },

    target: {
        base: "./target",

        get css() {
            return this.base + "/css";
        },

        cssMapsRelative: "maps",

        get cssMaps() {
            return this.css + "/" + this.cssMapsRelative;
        },

        get images() {
            return this.base + "/img";
        },

        get fonts() {
            return this.base + "/fonts";
        },
        
        get javascript() {
            return this.base + "/js";
        }
        
    },
    documentation: "./doc"
};

var files = {
    allTwig: allTwig,
    allJavascript: allJavascript,
    allJson: allJson,
    allStyles: allStyles,
    allHtml: allHtml,
    allFonts: allFonts,

    twigRecursive: twigRecursive,
    javascriptRecursive: javascriptRecursive,
    jsonRecursive: jsonRecursive,
    stylesRecursive: stylesRecursive,
    htmlRecursive: htmlRecursive,
    fontsRecursive: fontsRecursive,


    get viewTemplates() {
        return paths.source.viewTemplates + "/" + this.twigRecursive;
    },

    get componentTemplates() {
        return paths.source.componentTemplates + "/" + this.twigRecursive;
    },

    get layoutTemplates() {
        return paths.source.layoutTemplates + "/" + this.twigRecursive;
    },

    get templateData() {
        return paths.source.templateData + "/" + this.jsonRecursive;
    },

    get styles() {
        return paths.source.styles + "/" + this.stylesRecursive;
    },

    get html() {
        return paths.target.base + "/" + this.htmlRecursive;
    },

    source: {
        assets: paths.source.assets + "/" + recursive,
        images: paths.source.images + "/" + recursive,
        fonts: paths.source.fonts + "/" + fontsRecursive,
        javascript: paths.source.javascript + "/" + javascriptRecursive
    },

    target: {
        images: paths.target.images + "/" + recursive
    }

};

var file = {

    bower: {
        config: 'bower.js'
    },

    source: {
        mainStyle: paths.source.styles + "/main.scss",
        mainJavaScript: paths.source.javascript + "/main.js",

        get templateDataGlobal() {
            return paths.source.templateData + "/global.json";
        },

        templateData: function(viewFile) {
            return paths.source.templateData + "/" + path.basename(viewFile).replace(twigFile, jsonFile);
        }
    }
};


var gulpLoad = {
    pattern: 'gulp-*', // the glob to search for
    scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
    replaceString: 'gulp-', // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: true, // whether the plugins should be lazy loaded on demand
    // a mapping of plugins to rename
    rename: {
        //'gulp-task-listing' : 'taskListing'
        //'gulp-ruby-sass'    : 'sass',
        //        'lazypipe'         : 'lazypipe',
    }
};

var twig = {
    errorLogToConsole: true,
    cache: false
};

var sass = {
    errorLogToConsole: true,
    outputStyles: 'nested',
    precision: 10,
    onError: function (err) {
        console.log("Fail. Error:", err);
    },
    onSuccess: function(css) {
        // console.log("Success - Entry:", css.stats.entry);
        // console.log("Duration:", css.stats.duration);
    }
};



var sourceMaps = {
    init: {
        debug: true
    },

    write: {
        // reference the sources by comment not by header
        addComment: true,
        // we don't want to host the source files
        includeContent: false
    }
};


var browserSync = {
    port: 8080,
    server: {
        baseDir: './'
    },
    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    }
};

var jsbeautifier = {
    html: {
        indentSize: 2
    }
};

var imagemin = {
    progressive: true,
    interlaced: true
};


module.exports = {
    paths: paths,
    files: files,
    file: file,

    // options for plugins
    gulpLoad: gulpLoad,
    twig: twig,
    sass: sass,
    sourceMaps: sourceMaps,
    browserSync: browserSync,
    jsbeautifier: jsbeautifier,
    imagemin: imagemin
};
