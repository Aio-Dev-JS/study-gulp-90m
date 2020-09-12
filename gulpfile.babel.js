import del from "del";
import gulp from "gulp";
import gpug from "gulp-pug"

const routes = {
    pug: {
        src: "src/*.pug",
        dest: "build"
    }
    // 폴더 안 파일까지 선택할려면 /**/*.pug */
}

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const prepare = gulp.series([clean])

const assets = gulp.series([pug])

export const dev = gulp.series([prepare, assets]);
//  export는 package.json에서 쓸 함수에만 적용해주면 됨
// const gulp = require("gulp"); 
// 구 자바스크립트


