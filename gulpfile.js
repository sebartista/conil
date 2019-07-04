var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');


// Minify compiled CSS
gulp.task('minify-css', function() {
  return gulp.src('css/main.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('js/main.js')
    .pipe(uglify())    
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',      
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'))

  // gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
  //   .pipe(gulp.dest('vendor/jquery'))

  gulp.src('js/vendor/jquery-1.11.2.min.js').pipe(gulp.dest('vendor/jquery'))
  gulp.src(['node_modules/scrollreveal/dist/*.js'])
    .pipe(gulp.dest('vendor/scrollreveal'))

  gulp.src(['node_modules/popper.js/dist/umd/popper.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('vendor/popper'))

  gulp.src(['node_modules/animate.css/animate.min.css'])
    .pipe(gulp.dest('vendor/animatecss'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('vendor/jquery-easing'))

  gulp.src(['js/vendor/modernizr-2.8.3-respond-1.4.2.min.js'])
    .pipe(gulp.dest('vendor/modernizr'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('vendor/font-awesome'))

    gulp.src(['node_modules/slick-carousel/slick/slick-theme.css', 'node_modules/slick-carousel/slick/slick.css', 'node_modules/slick-carousel/slick/slick.min.js'])
    .pipe(gulp.dest('vendor/slick'))
})

// Default task
gulp.task('default', ['minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'minify-css', 'minify-js'], function() {  
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
