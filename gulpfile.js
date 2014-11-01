var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

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
               .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('default', ['bower-files', 'server']);
