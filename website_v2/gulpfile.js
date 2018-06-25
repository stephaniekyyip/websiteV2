'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pump = require('pump'); //to use with uglify
var browserSync = require('browser-sync').create();
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");

var cp = require('child_process');
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Jekyll build
gulp.task('jekyll-build', function(done){
  return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
    .on('close', done);
});

// Jekyll build with _config_dev.yml
gulp.task('jekyll-dev', function(done){
  return cp.spawn(jekyll, ['build', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'})
    .on('close', done);
});

// Jekyll rebuild + browser reload
gulp.task('jekyll-rebuild', ['jekyll-dev'], function(){
  browserSync.reload();
});

// Browser sync
gulp.task('browser-sync', function(){
  browserSync.init({
    server:{
      baseDir: "_site"
    }
  });
});

// SASS
gulp.task('sass', function(){
  return gulp.src('_sass/**/*.scss')
  .pipe(sass({
    includePaths:['scss'],
    onError: browserSync.notify
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssnano())
  .pipe(gulp.dest('_site/assets/css'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('assets/css'));
});

// Minify JS
gulp.task('scripts', function(){
  return gulp.src('_scripts/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/js'));
});

// Compress images
gulp.task('compress-img', function(){
  return gulp.src('assets/img/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive:true}),
      imagemin.optipng({optimizationlevel:5})
    ]))
    .pipe(gulp.dest('_site/assets/img'))
});

// Watch
gulp.task('watch', function(){
  gulp.watch('_sass/**/*.scss', ['sass']);
  gulp.watch(['_pages/**/*', '_layouts/*', '_includes/**/*', '*.html', '_data/**/*'], ['jekyll-rebuild']);
  gulp.watch(['assets/img/**/*'],['compress-img']);
  gulp.watch(['_scripts/*.js'], ['scripts']);
});

// Default
gulp.task('default', [ 'jekyll-dev', 'browser-sync', 'watch', 'sass', 'scripts']);
