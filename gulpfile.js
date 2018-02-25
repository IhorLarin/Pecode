const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');



gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('sass', function () {
  gulp
    .src('app/sass/**/*.sass')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/page-scroll-to-id/jquery.malihu.PageScroll2id.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('img', function () {
  return gulp.src('app/img/**/*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browserSync', 'sass', 'scripts'], function () {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/index.html', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function () {

  var buildCss = gulp.src('app/css/style.css')
    .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
