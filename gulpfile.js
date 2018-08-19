const gulp = require('gulp');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
// var exec = require('child_process').exec;
const imageResize = require('gulp-image-resize');
const del = require('del');
const rename = require('gulp-rename');



gulp.task('serve', ['sass','scripts','service-worker','copy-html','copy-data','resize-images','watch'],function(){
	console.log('starting serve task');
});

gulp.task('resize-images',()=>{
	const images = gulp.src('img/*')
	del (['dist/img/*'])
	images
	.pipe(imageResize({
		width: 800,
		crop: false,
		upscale: false,
		quality: 0.6,
		imageMagick: true
	}))
	.pipe(rename((path)=>{
		path.basename +='_large_2x'
	}))
	.pipe(gulp.dest('dist/img'))

	images
	.pipe(imageResize({
		width: 400,
		crop: false,
		upscale: false,
		quality: 0.6,
		imageMagick: true
	}))
	.pipe(rename((path)=>{
		path.basename +='_large_1x'
	}))
	.pipe(gulp.dest('dist/img'))


	images
	.pipe(imageResize({
		width: 250,
		crop: false,
		upscale: false,
		quality: 0.6,
		imageMagick: true
	}))
	.pipe(rename((path)=>{
		path.basename +='_medium'
	}))
	.pipe(gulp.dest('dist/img'))
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
	gulp.src(['js/**/*.js','!js/**/sw.js'])
		.pipe(gulp.dest('dist/js'));
});

gulp.task('service-worker',function(){
	gulp.src('js/**/sw.js')
		.pipe(gulp.dest('dist'));
});

gulp.task('copy-html',function(){
	gulp.src('*.html')
		.pipe(gulp.dest('./dist'));
});
// gulp.task('copy-images', function() {
// 	gulp.src('img/*')
// 		.pipe(gulp.dest('dist/img'));
// });

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
  gulp.watch(['js/**/*.js','!js/**/sw.js'],['scripts']).on('change',browserSync.reload);
  gulp.watch('js/**/sw.js',['service-worker']).on('change',browserSync.reload)
	browserSync.init({
		server: './dist'
	});
	browserSync.reload('index.html');
});
