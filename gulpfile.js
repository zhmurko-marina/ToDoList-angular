var gulp = require('gulp');
var scss = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var paths = {
    styles: {
        src: 'scss',
        files: 'scss/*.scss',
        dest: 'css'
    }
};

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: ''
    }
  })
});

gulp.task('scss',function (){
    return gulp.src(paths.styles.files)
	.pipe(scss())
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    .pipe(gulp.dest(paths.styles.dest))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', ['browserSync','scss'], function() {
    gulp.watch(paths.styles.files, ['scss']);
    gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});