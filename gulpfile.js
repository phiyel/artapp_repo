const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const concat = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

function styles() {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/styles'))
        .pipe(browserSync.stream());
}

function scripts() {
    return browserify({
        entries: ['./dev/scripts/app.js'],
        debug: true
    })
    .transform(babel)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/scripts'))
    .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: './public'
    });

    gulp.watch('./dev/styles/**/*.scss', styles);
    gulp.watch('./dev/scripts/**/*.js', scripts);
    gulp.watch('./public/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.serve = serve;
exports.default = gulp.series(styles, scripts, serve);