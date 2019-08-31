var gulp = require('gulp'),
sass = require('gulp-sass'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
imagemin = require('gulp-imagemin'),
clean = require('gulp-clean-css'),
babel = require('gulp-babel');
//pipeline = require('readable-stream').pipeline;
//js任务
gulp.task('js', () =>
    gulp.src('src/js/*.js')
    .pipe(babel({
    	presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
);


//css任务
gulp.task('css',()=>{
	gulp.src('src/sass/*.scss')
	.pipe(sass({outputStyle : "expanded"}))
	.pipe(clean())
	.pipe(gulp.dest('dist/css'))
})

//image任务
gulp.task('img',()=>{
	gulp.src('src/img/*.*')
	// gulp.src('src/img/*.jpg')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
})

//监听任务
gulp.task('default',()=>{
	gulp.watch('src/image/*.png',['img']);
	gulp.watch('src/image/*.jpj',['img'])
	gulp.watch('src/sass/*.scss',['css']);
	gulp.watch('src/js/*.js',['js']);	
})