var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var include = require('gulp-file-include');
var paths = {
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

gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
})

gulp.task('js', function(){
    return gulp.src(paths.srcJS)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('file-include', function() {
    return gulp.src(['index.html'])
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
    .pipe(gulp.dest('./'));
});

gulp.task('serve', gulp.series('sass', function() {
    
    browserSync.init({
        server: "./"
    });

    gulp.watch(paths.srcSCSS, gulp.series('sass',));
    gulp.watch("./*.html").on('change', browserSync.reload);
   
}));

gulp.task('default', gulp.series('serve'));

