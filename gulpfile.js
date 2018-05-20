var gulp = require('gulp'),
    server = require('gulp-webserver'),
    sass = require('gulp-sass'),
    cssMin = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sequence = require('gulp-sequence'),
    mockJson = require('./mock');
gulp.task('css', function() {
    return gulp.src('./src/scss/*.scss') //加_的scss文件不会被编译
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Android >=4.0'] }))
        .pipe(cssMin())
        .pipe(gulp.dest('./src/css'))
});
gulp.task('server', ['css'], function() {
    return gulp.src('src')
        .pipe(server({
            port: 9898,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url == 'favicon.ico') return;
                if (/\/api/g.test(req.url)) {
                    res.end(JSON.stringify(mockJson(req.url)))
                }
                next();
            }
        }))
});
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', ['css']);
});
gulp.task('default', function(ck) {
    sequence('server', 'watch', ck)
});