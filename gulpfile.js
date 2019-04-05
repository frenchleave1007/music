var gulp = require("gulp");

//压缩html 插件
var htmlClean = require("gulp-htmlclean");

//压缩图片
var imageMin = require("gulp-imagemin");

//压缩js
var uglify = require("gulp-uglify");

//去掉js中的调试语句如console
var debug = require("gulp-strip-debug");

//将less转换成css
var less = require("gulp-less");

//压缩css
var cleanCss = require("gulp-clean-css");

//postcss  autoprefixer 自动给css3属性添加前缀
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

//开启服务器代理
var connect = require('gulp-connect');


var folder = {
    src: "src/",
    dist: "dist/"
}

//判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
// export NODE_ENV=development 设置环境变量


gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload()) //自动刷新页面
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("css", function () {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
    if (!devMod) {
        page.pipe(cleanCss())
    }
    page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("image", function () {
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})

gulp.task("server", function () {
    connect.server({
        port: "8888",
        livereload: true
    });
})

//开启监听文件变化
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"])
})

gulp.task("default", ["html", "css", "js", "image", "server", "watch"]);
// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()