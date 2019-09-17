'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function style () { // компилирует файл scss в css
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass()) // процесс компиляции
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./src/dist')) // создает файл в './src'
    .pipe(browserSync.stream()); // запускает browser-sync
}

function watch () { // смотрит только за изменениями файлов
  browserSync.init({ // инициализирует сервер
    server: {
      baseDir: './src'
    },
    online: true,
    tunnel: true,
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/*.js').on('change', browserSync.reload);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

style();

// запуск 'gulp watch' через терминал или 'npm start'
