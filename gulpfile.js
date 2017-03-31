const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const concat = require('gulp-concat');

const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
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
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outFolder))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.stream())
});

gulp.task('js', () => {
  return gulp.src(`${srcFolder}/js/*.js`)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(outFolder));
});

gulp.task('build', ['template', 'scss', 'js']);

// Build is a pre-req so that we start serving the latest version of files
gulp.task('serve', ['build'], () => {
  // Start the browser sync server
  browserSync({
    server: {
      baseDir: 'docs',
    },
  });
  
  // Watch for changes to SCSS files and trigger the build process when 
  // they are updated
  return gulp.watch(`${srcFolder}/scss/**/*.scss`, ['scss']);
});
