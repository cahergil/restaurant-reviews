var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
// var exec = require('child_process').exec;

gulp.task('serve', ['sass','scripts','copy-html','copy-images','copy-data','watch'],function(){
	console.log('starting serve task');
});

gulp.task('jshint',function(){
	return gulp.src('js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});


// gulp.task('styles', function() {
// 	gulp.src('sass/**/*.scss')
// 		.pipe(sass({
// 			outputStyle: 'compressed'
// 		}).on('error', sass.logError))
// 		.pipe(autoprefixer({
// 			browsers: ['last 2 versions']
// 		}))
// 		.pipe(gulp.dest('dist/css'))
// 		.pipe(browserSync.stream())
// 		.pipe(browserSync.reload);
// });

gulp.task('sass', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		// .pipe(autoprefixer({
		// 	browsers: ['last 2 versions']
		// }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());

});

gulp.task('scripts',function(){
	gulp.src('js/**/*.js')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html',function(){
	gulp.src('*.html')
		.pipe(gulp.dest('./dist'));
});
gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('copy-data',function(){
	gulp.src('data/*.json')
		.pipe(gulp.dest('dist/data'));
});

// gulp.task('launch-server',function(cb){
// 	exec('python -m http.server 8000',function(err,stdout,stderr){
// 		console.log(stdout);
// 		console.log(stderr);
// 		cb(err);
// 	});
// });

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['jshint']);
  gulp.watch('sass/**/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch("*.html",['copy-html']).on('change', browserSync.reload);
  gulp.watch("js/**/.js",['scripts']).on('change',browserSync.reload);
	browserSync.init({
		server: './dist'
	});
	browserSync.reload('index.html');
});
