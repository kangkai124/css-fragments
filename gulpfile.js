var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var webserver = require('gulp-webserver');

gulp.task('watching', function () {
    gulp.watch('grid/*.less',['less']);
});

gulp.task('less', function () {
    gulp.src('grid/*.less')
        .pipe(less())
        .pipe(gulp.dest('grid'));
});

gulp.task("cssmin",function () {
    gulp.src('./grid/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./grid/css'));
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('static/dist/img'));
});

gulp.task("web",function(){
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            host: '10.1.30.112',
            port:8080
        }))
})
gulp.task('default',['web','watching','less']);
