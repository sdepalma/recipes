"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var resolutions = require('browserify-resolutions');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minify = require('gulp-minify-css')
var lint = require('gulp-eslint');

var config = {
    port: 8080,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/**/*.html',
        js: './src/**/*.js',
        images: './src/images/**',
        less: './src/styles/**/*.less',
        dist: './dist',
        mainJs: './src/index.js'
    }
}

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true,
        fallback: './src/index.html'
    });
});

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }))
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('less', function() {
    return gulp.src(config.paths.less)
    .pipe(less({ style: 'compressed' }))
    .pipe(gulp.dest(config.paths.dist + '/styles'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

    gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist))
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
    .transform("babelify", {presets: ["es2015", "react"]})
    .plugin(resolutions, '*')
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('global.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
    .pipe(lint({configFile: 'eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'less', 'images', 'lint', 'open', 'watch']);
