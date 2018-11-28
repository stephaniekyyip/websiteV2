'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browsersync = require('browser-sync').create();
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const del = require("del");

const cp = require('child_process');
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Clean files
function clean(done) {
  del(['./_site']);
  done();
}

// Jekyll build
function jekyllBuild(done) {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], {stdio: 'inherit'})
  .on('close', done);
}

// Jekyll Dev build with _config_dev.yml
function jekyllDev(done){
  return cp.spawn("bundle", ["exec", "jekyll", "build", "--config", "_config.yml,_config_dev.yml"], {stdio: 'inherit'})
  .on('close', done);
}

// Browser sync initialization
function browserSync(done) {
  browsersync.init({
    server:{
      baseDir: "./_site"
    }
  });
  done();
}

// Browser sync reload
function browserSyncReload(done){
  browsersync.reload();
  done();
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
  .pipe(browsersync.reload({stream:true}))
  .pipe(gulp.dest('./assets/css'));
}

// Minify JS
function scripts() {
  return gulp.src('./_scripts/*.js')
    //.pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./_site/assets/js'))
    .pipe(browsersync.stream())
    .pipe(gulp.dest('assets/js'));
}

// Compress images
function images() {
  return gulp.src('assets/img/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive:true}),
      imagemin.optipng({optimizationlevel:5})
    ]))
    .pipe(gulp.dest('./_site/assets/img'));
}

// Watch
function watchFiles() {
  gulp.watch('./_sass/**/*.scss', gulp.series(css, browserSyncReload));
  gulp.watch(['./_pages/**/*', './_layouts/*', './_includes/**/*', './*.html', './_data/**/*'], gulp.series(jekyllDev, browserSyncReload));
  gulp.watch(['./assets/img/**/*'], gulp.series(images, browserSyncReload));
  gulp.watch(['./_scripts/*.js'], gulp.series(scripts, browserSyncReload));
}

// Tasks
gulp.task("images", images);
gulp.task("css", css);
gulp.task("scripts", scripts);
gulp.task("jekyllBuild", jekyllBuild);
gulp.task("jekyllDev", jekyllDev);

// Build
gulp.task(
  "build",
  gulp.series(clean, css, images, scripts,jekyllBuild)
);
// const build = gulp.series(clean, css, images, scripts,jekyllBuild, watchFiles);


// Development
gulp.task(
  "dev",
  gulp.series(clean, css, images, scripts, jekyllDev, browserSync, watchFiles)
);
// const dev = gulp.series(clean, css, images, scripts, jekyllDev, browserSync, watchFiles);