/*
*   Task Automation to make my life easier.
*   Author: Jean-Pierre Sierens
*   ===========================================================================
*/
 
// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');
 
// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;
 
// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false);
});
 
gulp.task('deploy', function (){
    bundleApp(true);
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
 
gulp.task('sass', function() {
    var s = sass();
    s.on('error', function(e) { console.log(e); console.log("Error processing SASS"); this.emit('end'); });

    return gulp.src('src/sass/*.scss')
        .pipe(s)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});
 
gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js'], ['scripts']);
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/**/*.scss'], ['sass']);
});
 
// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts', 'sass', 'html','watch']);


// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
    scriptsCount++;
    // Browserify will bundle all our js files together in to one and will let
    // us use modules in the front end.
    var appBundler = browserify({
        entries: './src/js/app.js',
        debug: true
    })
 
    // If it's not for production, a separate vendors.js file will be created
    // the first time gulp is run so that we don't have to rebundle things like
    // react everytime there's a change in the js file
    if (!isProduction && scriptsCount === 1){
        // create vendors.js for dev environment.
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendor.js'))
            .pipe(gulp.dest('./dist/js/'));
    }
    if (!isProduction){
        // make the dependencies external so they dont get bundled by the 
        // app bundler. Dependencies are already bundled in vendor.js for
        // development environments.
        dependencies.forEach(function(dep){
            appBundler.external(dep);
        })
    }
 
    // transform ES6 and JSX to ES5 with babelify
    appBundler
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'));
}