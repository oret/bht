var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');

gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles(/* options */),
               { base: './bower_components' })
               .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('default', ['bower-files']);
