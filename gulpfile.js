var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var gjslint = require('gulp-gjslint');

var path = {
    scripts: [
        './**/*.js',
        '!./public/javascripts/libs/**/*.js',
        '!./node_modules/**/*.js',
        '!./bower_components/**/*.js'
    ]
};

gulp.task('jshint', function() {
  return gulp.src(path.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('gjslint', function() {
    return gulp.src(path.scripts)
        .pipe(gjslint());
});

gulp.task('server', function () {
  livereload.listen();

  nodemon({
    script: './bin/www', // express 4系の場合
    // script: 'app.js', // express 3系の場合
    ext: 'html js ejs css',
    ignore: ['ignored.js', 'node_modules', 'bower_components'] })
    .on('start', function () {
      console.log('started!');
          livereload.changed();  // Browserにlivereloadを通知
    });
});

gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles(/* options */),
               { base: './bower_components' })
               .pipe(gulp.dest('./public/javascripts/libs'))
});

gulp.task('lint', ['gjslint', 'jshint']);
gulp.task('default', ['bower-files', 'lint']);
