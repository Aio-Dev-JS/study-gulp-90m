import del from "del";
import gulp from "gulp";
import image from "gulp-image";
import gpug from "gulp-pug"
import ws from "gulp-webserver"
import sass from "gulp-sass";
import autop from "gulp-autoprefixer";
import miniCSS from "gulp-csso";

sass.compiler = require("node-sass");


const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    img: {
        src: "src/img/*",
        dest: "build/img"

    },
    // 폴더 안 파일까지 선택할려면 /**/*.pug */
    scss: {
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "build/css"
    }
};

const img = () => gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const styles = () => gulp.src(routes.scss.src).pipe(sass().on("error", sass.logError)).pipe(autop()).pipe(miniCSS()).pipe(gulp.dest(routes.scss.dest));

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const webserver = () => gulp.src("build").pipe(ws({ livereload: true, open: true }));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, styles);
}
// img src에 변동이 있을때마다 img 실행

const prepare = gulp.series([clean, img])
// img는 시간이 오래걸리므로 prepare에 넣음

const assets = gulp.series([pug, styles])

const postDev = gulp.parallel([webserver, watch])

export const dev = gulp.series([prepare, assets, postDev]);
//  export는 package.json에서 쓸 함수에만 적용해주면 됨
// const gulp = require("gulp"); 
// 구 자바스크립트


