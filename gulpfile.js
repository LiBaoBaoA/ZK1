var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
var clean = require('gulp-clean-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


//编译scss
gulp.task('sass', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./build/dist/scss/'))
})
gulp.task('watch', function() {
    return gulp.watch('src/scss/index.scss', gulp.series('sass'));
})


//合并压缩js
gulp.task('uglify', function() {
    return gulp.src('./src/js/list.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/dist/js/'))
})

//起服务
gulp.task('webserver', function() {
    return gulp.src('./src/')
        .pipe(webserver({
            port: 8000,
            open: true,
            livereload: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname
                if (pathname == '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathname == '/') {
                    res.end(fs.readFileSync(path.join(__dirname, './src/index.html')));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, './src/', pathname)));
                }
            }
        }))
})