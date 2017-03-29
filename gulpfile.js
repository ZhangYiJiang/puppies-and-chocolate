const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const story = require('./story_transformer');

const outFolder = 'docs';
const srcFolder = 'src';

gulp.task('template', () => {
  return gulp.src(`${srcFolder}/templates/*.pug`)
    .pipe(pug({
      filters: { 'story': story.render },
    }))
    .pipe(gulp.dest(outFolder));
});

gulp.task('scss', () => {
  return gulp.src(`${srcFolder}/scss/app.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(outFolder));
});

gulp.task('js', () => {
  return gulp.src(`${srcFolder}/js/*.js`)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(outFolder));
});

gulp.task('build', ['template', 'scss', 'js']);
