'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const browsersync = require('browser-sync').create();
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const del = require("del");

const cp = require('child_process');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Jekyll build
function jekyllBuild() {
  return cp.spawn("bundle", ["exec", jekyll, "build"], {stdio: 'inherit'})
}

// Jekyll Dev build with _config_dev.yml
function jekyllDev(){
  return cp.spawn("bundle", ["exec", jekyll, "build", "--config", "_config.yml,_config_dev.yml"], {stdio: 'inherit'})
}

// Browser sync initialization
function browserSync(done) {
  browsersync.init({
    server:{
      baseDir: "./_site/"
    },
    port: 4000,
    open: false,
    reloadOnRestart: true,
  });
  done();
}

// Browser sync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean files
function clean() {
  return del(['./_site/assets/']);
}

// SASS
function css(){
  return gulp
  .src('./_sass/**/*.scss')
  .pipe(sass({
    includePaths:['scss'],
    onError: browsersync.notify
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssnano())
  .pipe(gulp.dest('./_site/assets/css'))
  .pipe(gulp.dest('./assets/css'))
  .pipe(browsersync.stream());
}

// Minify JS
function scripts() {
  return gulp.src('./_scripts/*.js')
    //.pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./_site/assets/js'))
    .pipe(gulp.dest('./assets/js'))
    .pipe(browsersync.stream());
}

// Compress images
function images() {
  return gulp.src('./assets/img/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive:true}),
      imagemin.optipng({optimizationlevel:5})
    ]))
    .pipe(gulp.dest('./_site/assets/img'))
}

// Watch
function watchFiles() {
  gulp.watch('./_sass/**/*.scss', gulp.series(css, browserSyncReload));
  gulp.watch(['./_pages/**/*', './_layouts/*', './_includes/**/*', './*.html', './_data/**/*'], gulp.series(jekyllDev, browserSyncReload));
  gulp.watch('./assets/img/**/*', gulp.series(images, browserSyncReload));
  gulp.watch('./_scripts/*.js', gulp.series(scripts, browserSyncReload));
}

// Tasks
gulp.task("images", images);
gulp.task("css", css);
gulp.task("scripts", scripts);
gulp.task("jekyllBuild", jekyllBuild);
gulp.task("jekyllDev", jekyllDev);
gulp.task("clean", clean);

// Build
gulp.task(
  "build",
  gulp.series(clean, gulp.parallel(css, images, scripts, jekyllBuild))
);

// Development
gulp.task(
  "dev",
  gulp.series(css, images, scripts, jekyllDev, gulp.parallel(watchFiles, browserSync))
);