import gulp from 'gulp';
import browsersync from 'browser-sync';
import cdnizer from 'gulp-cdnizer';

// common
import grep from 'gulp-grep';
import using from 'gulp-using';
import concat from 'gulp-concat';
import source from 'vinyl-source-stream';

// style 
import sass from 'gulp-sass';
import plumber from 'gulp-plumber'; // when we met sass errors , made gulp work continue 
import sourcemaps from 'gulp-sourcemaps';

// js browserify
import browserify from 'browserify';
import watchify from 'watchify';

// es6 transform
import babelify from 'babelify';

let paths = {
    dirs: {
        build: './build',
        app : './app'
    },
    build: {
        css: './build/css',
        js : './build/js'
    },
    app :{
        sass: './app/sass/*.scss',
        js  : './app/js/*.js',
    },
    vendor : {

    },
    cdnURL: './'
};

function Browserify(watch){

    let b = watchify(browserify({
        entries: ['./app/js/app.js'],
        cache: {},
        packageCache: {},
        fullPaths: true
    }).transform(babelify));
    
    function rebundle(){
        return b.bundle()
                .on('error',function(err){console.log(err)})
                .pipe(source('app.js'))
                .pipe(gulp.dest(paths.build.js))
                .on('end',function(){
                });
    }

    if(watch){
        b.on('update',function(){
            rebundle();
        })
    }

    return rebundle(b);
}

function BrowserSync(){
    return(
        browsersync({
            server: {
                baseDir: './'
            },
            proxy: '',
            port: 4000,
            files: [paths.dirs.app + '/**/*.scss',
                     paths.dirs.app + '/**/*.js'],
            browser: ['google chrome']
        })
    );
}

function Cdnizer(){
    return(
            gulp.src("./index.html")
                .pipe(cdnizer({
                    defaultCDNBase: paths.cdnURL,
                    allowRev: true,
                    alloMin: true,
                    files: [
                        '/bower_components/**/*.js',
                        '/build/css/*.css',
                        '/build/js/*.js'
                        ]
                    }
                    ))
                .pipe(gulp.dest(paths.dirs.build))
    )
}

function Sass(){
    return (
            gulp.src(paths.app.sass)
                .pipe(plumber())
                .pipe(using({ prefix: 'After changed:' }))
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(sourcemaps.write('./maps'))
                .pipe(gulp.dest(paths.build.css))
                .pipe(grep('**/*.css', { read: false , dot: true}))
     );
}

// Task Partition

// Stylesheet
gulp.task('watch:styles',() => {
    gulp.watch(paths.app.sass , Sass);
    //expend for less ...
})

// Javascript file 
gulp.task('watch:js',() => {
    gulp.watch(paths.app.js , Browserify);
})

// Cdn 
gulp.task('cdnizer',Cdnizer);

// Finally watch
gulp.task('watch', gulp.parallel([BrowserSync,'watch:styles','watch:js']));
