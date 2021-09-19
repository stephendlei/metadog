const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const include = require('gulp-file-include');
const ghpages = require('gh-pages');
const sourcemaps = require("gulp-sourcemaps");
const paths = {
    src: 'src/**/*',
    srcHTML: 'src/**/*.html',
    srcSCSS: 'src/**/*.scss',
    srcJS: 'src/**/*.js',
    tmp: 'tmp',
    tmpIndex: 'tmp/index.html',
    tmpCSS: 'tmp/**/*.css',
    tmpJS: 'tmp/**/*.js',
    dist: 'dist',
    distIndex: 'dist/index.html',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
};

gulp.task('sass', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
})

gulp.task('js', function () {
    return gulp.src(paths.srcJS)
        .pipe(sourcemaps.init())
        .pipe(concat('portfolio.js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('file-include', function () {
    return gulp.src(['./*.html'])
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', gulp.series('sass', function () {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch(paths.srcJS, gulp.series('js'));
    gulp.watch(paths.srcSCSS, gulp.series('sass'));
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
}));

gulp.task('deploy', () => {
    return ghpages.publish('dist', function (err) { });
});

gulp.task('run', gulp.series('serve'));

gulp.task('default', gulp.series('serve'));

