var gulp = require('gulp'),
	scss = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	// csscomb = require('gulp-csscomb'), //хрень какая-то вроде группирует стили
	// uncss = require('gulp-uncss'), //удаляет неиспользуемые стили ВЫПИЛИВАЕТ ДИНАМИЧЕСКИЕ СТИЛИ ВРОДЕ ACTIVE/LOCK
	csso = require('gulp-csso'), // минификатор css
	htmlmin = require('gulp-htmlmin'),
	// uglify = require('gulp-uglify'), // Не пашет с ES6
	// pipeline = require('readable-stream').pipeline, //хня для uglify который не пашет
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin');

// gulp.task('dist', ['imgmin', 'jsmin', 'htmlmin', 'cssmin', 'fonts', 'awesomecss', 'libs'], function (){
// 	console.log('Построение файлов…');
// })


// gulp.task('csscomb', function() {
// 	return gulp.src('gem-puzzle/css/main.css')
// 		.pipe(csscomb())
// 		.pipe(gulp.dest('dist/css'));
// });

// gulp.task('uncss', function() {
//     return gulp.src('gem-puzzle/css/main.css')
//         .pipe(uncss({
//             html: ['gem-puzzle/index.html']
//         }))
//         .pipe(gulp.dest('dist/css'));
// });

// gulp.task('jsmin', function () {
// 	return pipeline(
// 		gulp.src('gem-puzzle/js/*.js'),
// 		uglify(),
// 		gulp.dest('dist/js')
// 	);
// });

gulp.task('fonts', function() {
	return gulp.src('gem-puzzle/assets/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

})

gulp.task('awesomecss', function() {
	return gulp.src('gem-puzzle/assets/css/font-awesome.min.css')
		.pipe(gulp.dest('dist/css'))
})

gulp.task('libs', function() {
	return gulp.src('gem-puzzle/assets/libs/*')
		.pipe(gulp.dest('dist/libs'))
})

gulp.task("imgmin", function () {
	return gulp.src("gem-puzzle/assets/img/*.*")
		.pipe(imagemin([
				imagemin.gifsicle({interlaced: true}),
				imagemin.mozjpeg({quality: 75, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
					]
				})
		]))
		.pipe(gulp.dest('dist/img'));
});


gulp.task("jsmin", function () {
	return gulp.src("gem-puzzle/assets/js/*.js")
		// .pipe(rename(function (path) {
		// path.basename += ".min";
		//  }))
		.pipe(uglify(/* options */))
		.pipe(gulp.dest("dist/js"));
});

gulp.task('htmlmin', () => {
	return gulp.src('gem-puzzle/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
});

gulp.task('cssmin', function () {
	return gulp.src('gem-puzzle/css/style.css')
		.pipe(csso({
			restructure: false,
			sourceMap: true,
			debug: true
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scss', function () {
	return gulp.src('gem-puzzle/assets/scss/**/*.scss')
		.pipe(scss())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('gem-puzzle'))
		.pipe(browserSync.reload({stream:true}))
});


gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir:'gem-puzzle'
		},
		notify:false
	});
});
gulp.task('scripts', function (){
	return gulp.src(['gem-puzzle/assets/js/common.js', 'gem-puzzle/assets/libs/**/*.js'])
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('code', function(){
	return gulp.src('gem-puzzle/*.html')
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function() {
	gulp.watch('gem-puzzle/assets/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('gem-puzzle/*.html', gulp.parallel('code'));
	gulp.watch(['gem-puzzle/assets/js/common.js', 'gem-puzzle/assets/libs/**/*.js'], gulp.parallel('scss'));
});
gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));
gulp.task('dist', gulp.parallel('imgmin', 'jsmin', 'htmlmin', 'cssmin', 'fonts', 'awesomecss', 'libs'));
