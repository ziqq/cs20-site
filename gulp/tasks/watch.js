var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
	['copy:watch',
	
	'sprite:svg:watch',
	'sprite:png:watch',
	'nunjucks:watch',
	'js:watch',
	'list-pages:watch',
	'sass:watch'
]);
