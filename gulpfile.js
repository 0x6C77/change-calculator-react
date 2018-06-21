/*
*   Modified from example by Jean-Pierre Sierens: http://jpsierens.com/tutorial-gulp-javascript-2015-react/
*/

var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');
 

var dependencies = [
    'react',
    'react-dom'
];

var firstRun = true;
 

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp();
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
 

gulp.task('default', ['scripts', 'sass', 'html','watch']);



// Private Functions
// ----------------------------------------------------------------------------
function bundleApp() {
    var appBundler = browserify({
        entries: './src/js/main.js',
        debug: true
    })
 
    if (firstRun){
        // create vendors.js for dev environment.
        browserify({ require: dependencies, debug: true })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendor.js'))
            .pipe(gulp.dest('./dist/js/'));
    }
    firstRun = false;

    dependencies.forEach(function(dep) {
        appBundler.external(dep);
    });
 
    // transform ES6 and JSX to ES5 with babelify
    appBundler
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'));
}