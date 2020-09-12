import del from "del";
import gulp from "gulp";
import gpug from "gulp-pug"
import ws from "gulp-webserver"

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    }
    // 폴더 안 파일까지 선택할려면 /**/*.pug */
}

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const webserver = () => gulp.src("build").pipe(ws({ livereload: true, open: true }));

const watch = () => {
    gulp.watch(routes.pug.watch, pug)
}
// 

const prepare = gulp.series([clean])

const assets = gulp.series([pug])

const postDev = gulp.parallel([webserver, watch])

export const dev = gulp.series([prepare, assets, postDev]);
//  export는 package.json에서 쓸 함수에만 적용해주면 됨
// const gulp = require("gulp"); 
// 구 자바스크립트


