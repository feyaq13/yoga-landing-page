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
    .pipe(gulp.dest('./docs')) // создает файл в './src'
    .pipe(browserSync.stream()); // запускает browser-sync
}

function move () { // переносит файлы в неизменном виде в директорию для docs
  gulp.src('./src/*.{html,js}').pipe(gulp.dest('./docs'))
  gulp.src('./src/images/*').pipe(gulp.dest('./docs/images'))
}

function watch () { // смотрит только за изменениями файлов
  browserSync.init({ // инициализирует сервер
    server: {
      baseDir: './docs'
    },
    online: true,
    tunnel: true,
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch(['./src/*.{html,js}', './src/scss/.*scss']).on('change', move);
  gulp.watch('./docs/**/*').on('change', browserSync.reload);
}

// todo сделать копировалку для index.html main.js и картинок в docs в неизменном виде

exports.style = style;
exports.watch = watch;

style();
move();

// запуск 'gulp watch' через терминал или 'npm start'
