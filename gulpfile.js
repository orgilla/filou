const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const newer = require('gulp-changed');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const debug = require('gulp-debug');
const babelrc = require('./.babelrc');

process.env.NODE_ENV = 'production';

const dest = '.';
const src = ['packages/**/*.es6'];

const compile = (glp, force) =>
  glp
    .pipe(plumber())
    .pipe(debug())
    .pipe(newer(dest, { extension: force ? '.xyz' : '.js' }))
    .pipe(sourcemaps.init())
    .pipe(babel(babelrc))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));

gulp.task('watch', () => {
  return compile(watch(src, { ignoreInitial: false, base: dest, dot: true }));
});

gulp.task('build', () => {
  return compile(gulp.src(src));
});
