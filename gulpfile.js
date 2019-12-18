var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    babel = require('gulp-babel'),
    rimraf = require('rimraf'),
    rigger = require('gulp-rigger'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        img: 'build/assets/images/',
        fonts: 'build/assets/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/assets/js/*.*',
        jsLibs: 'src/assets/js/libs.js',
        style: 'src/assets/css/**/*.*',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/css/**/*.css',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('images:build', function () {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('js:buildLibs', function () {
    gulp.src(path.src.jsLibs)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: "./build"
        },
        index: 'index.html',

        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('build', [
    'html:build',
    'style:build',
    'fonts:build',
    'images:build',
    'js:buildLibs',
    'js:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:buildLibs');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('images:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'browserSync', 'watch']);

