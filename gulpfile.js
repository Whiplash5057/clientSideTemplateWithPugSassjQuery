var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifySS = require('gulp-more-css'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    jquery = require('gulp-jquery'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify');

//==== By default compile scripts then styles then watch changes.
gulp.task('default', ['markup','jquery','scripts', 'styles', 'watch']);

gulp.task("watch",function(){
  gulp.watch('devCode/js/*.js', ['scripts']);
  gulp.watch('devCode/sass/*.sass', ['styles']);
  gulp.watch('devCode/pug/*.pug', ['markup']);
});

gulp.task('markup', function(){
  //**** compile pug code ****//
  gulp.src('devCode/pug/index.pug')
      .pipe(pug())
      .pipe(gulp.dest('devCode'));

  gulp.src('devCode/index.html')
      .pipe(gulp.dest('public'));
});


gulp.task('jquery', function () {

  // creates ./public/vendor/jquery.custom.js
  jquery.src({
      release: 2, //jQuery 2
      flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
  })
  .pipe(gulp.dest('./public/vendor'));
});


gulp.task('scripts', function(){

  //**** browserify and uglify js code ****//
  return browserify('devCode/js/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js'));

  //**** uglify js code ****//
  // gulp.src('devCode/js/bundle.js')
  //     .pipe(uglify())
  //     .pipe(gulp.dest('public/js'));
});


gulp.task('styles', function(){
    //**** compile sass code ****//
    gulp.src('devCode/sass/styles.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('devCode/css'));

    //**** minify css code ****//
    gulp.src('devCode/css/styles.css')
        .pipe(minifySS())
        .pipe(gulp.dest('public/css'));
});
