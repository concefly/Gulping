import gulp from 'gulp';
import browsersync from 'browser-sync';
import cdnizer from 'gulp-cdnizer';

// common
import grep from 'gulp-grep';
import using from 'gulp-using';
import concat from 'gulp-concat';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
// import uglify from 'gulp-uglify';
import assign from 'lodash.assign';
import sourcemaps from 'gulp-sourcemaps';

// style 
import sass from 'gulp-sass';
import plumber from 'gulp-plumber'; // when we met sass errors , made gulp work continue 
import autoprefixer from 'gulp-autoprefixer';

// js browserify
import browserify from 'browserify';
import watchify from 'watchify';

// es6 transform
import babelify from 'babelify';

let reload = browsersync.reload;

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


function Browserify(){
    
    let customOpts = {
        entries: ['./app/js/app.js'],
        cache: {},
        packageCache: {},
        fullPaths: true,
        insertGlobals: true,
        debug:true
    };

    let opts = assign({}, watchify.args, customOpts);
    let b = watchify(browserify(opts));
    
    b.on('update',rebundle);

    function rebundle(){
            return b.transform(babelify)
                    .bundle()
                    .on('error',(err) => {console.log(err)})
                    .pipe(source('app.js'))
                    .pipe(buffer())
                    .pipe(sourcemaps.init({loadMaps:true}))
                    .pipe(sourcemaps.write('./maps'))
                    .pipe(gulp.dest(paths.build.js))
                    // .pipe(browsersync.stream())   // 把修改过的文件 输出到 console,并reload
                    .on('end',() => {
                        reload();
                    });
    }

    return rebundle();
}

function BrowserSync(){
    return(
        browsersync({
            server: {
                baseDir: './'
            },
            proxy: '',
            port: 4000,
            browser: ['google chrome']
            // open: false
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
                // .pipe(using({ prefix: 'After changed:' }))
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(autoprefixer({
                    browser: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(sourcemaps.write('./maps'))
                .pipe(gulp.dest(paths.build.css))
                // .pipe(grep('**/*.css', { read: false , dot: true}))
     );
}

// Task Partition

gulp.task('build', gulp.series(Browserify,Sass));

// Stylesheet
gulp.task('watch:styles',() => {
    gulp.watch(paths.app.sass, gulp.series(Sass, reload));
    //expend for less ...
})

// Javascript file 
gulp.task('watch:js',() => {
    gulp.watch(paths.build.js , Browserify);
})

// Cdn 
gulp.task('cdnizer',Cdnizer);

//If need , there must has a clean task 

// Finally watch
gulp.task('watch', gulp.series('build',gulp.parallel('watch:styles','watch:js',BrowserSync)));
