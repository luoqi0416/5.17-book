var gulp = require('gulp'),
    server = require('gulp-webserver'),
    sass = require('sass'),
    cssMin = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sequence = require('gulp-sequence');
gulp.task('css', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Android >=4.0'] }))
        .pipe(cssMin())
        .pipe(gulp.dest('.src/sass/'))
});
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9898
        }))
});
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', 'css');
});
gulp.task('default', function(ck) {
    sequence('css', 'server', 'watch', ck)
});