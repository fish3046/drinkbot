var watch = require('gulp-watch');
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var bowerfiles = require("main-bower-files");


/**
 * Primary task executed when gulp runs.  This will concat and uglify the specified source files,
 * and put the resulting file in public/js
 */
gulp.task('default', function(){
	var scriptFiles = [
		'public/app/common/app.js',
		'public/app/app.js',
		'public/app/**/*.js'
	];

	return gulp.src(scriptFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/js'));
});

/**
 * Vendor task, executed with "gulp vendor".  This concats and uglifies all vendor files and puts
 * them in a public/js/vendor.js
 */
gulp.task('vendor', function(){
	var vendorFiles = [
		'public/vendor/Chart.js/Chart.js',
		'public/vendor/jquery/jquery.js',
		'public/vendor/**/*.js'
	];

	return gulp.src(vendorFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', function(){
	var scriptFiles = [
		'public/app/common/app.js',
		'public/app/app.js',
		'public/app/**/*.js'
	];

	watch(scriptFiles, function(events){
		gulp.start('default');
	});
});

gulp.task('bower-install', function(){
	gulp.src(bowerfiles(), { base: 'bower_components' })
		.pipe(gulp.dest('public/vendor'));
});