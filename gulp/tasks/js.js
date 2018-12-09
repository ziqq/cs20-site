var gulp = require('gulp');
var config = require('../config');
var include = require("gulp-include");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
reload = browserSync.reload;

gulp.task('js', function() {
	return gulp
		.src(config.src.js + '/app.js')
		.pipe(
			plumber({
				errorHandler: config.errorHandler
			})
		)
		.pipe(include())
		.pipe(babel())
		.pipe(gulp.dest(config.dest.js + '/'))
		.pipe(reload({ stream: true }));
});

gulp.task('js:libs', function() {
	return gulp
		.src(config.src.js + '/libs.js')
		.pipe(include())
		.on('error', function() {
			notify('Javascript include error');
		})
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(uglify())
		.pipe(gulp.dest(config.dest.js + '/'))
		.pipe(reload({ stream: true }));
});

gulp.task('js:assets', function() {
	return gulp
		.src([config.src.jsAssets + '/yandex.map.js'])
		.pipe(gulp.dest(config.dest.js + '/assets/'));
});

gulp.task('js:all', function(js) {
	runSequence('js:libs', 'js:assets', 'js', js);
});

gulp.task('js:watch', function() {
	gulp.watch([config.src.js + '/app.js'], ['js']);
	gulp.watch([config.src.js + '/libs.js'], ['js:libs']);
});