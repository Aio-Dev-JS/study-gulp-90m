import del from "del";
import gulp from "gulp";
import image from "gulp-image";
import gpug from "gulp-pug"
import ws from "gulp-webserver"
import sass from "gulp-sass";
import autop from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro"
import babelify from "babelify"
import ghPages from "gulp-gh-pages"

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
    },
    js: {
        watch: "src/js/*",
        src: "src/js/main.js",
        dest: "build/js"
    }

};


const gh = () => gulp.src("build/**/*").pipe(ghPages());

const js = () => gulp.src(routes.js.src).pipe(bro({
    transform: [babelify.configure({ presets: ["@babel/preset-env"] }, ['uglifyify', {
        global: true
    }])]
})).pipe(gulp.dest(routes.js.dest))

const img = () => gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const styles = () => gulp.src(routes.scss.src).pipe(sass().on("error", sass.logError)).pipe(autop()).pipe(miniCSS()).pipe(gulp.dest(routes.scss.dest));

const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build", ".publish"]);

const webserver = () => gulp.src("build").pipe(ws({ livereload: true, open: true }));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, styles);
    gulp.watch(routes.js.watch, js);
}
// img src에 변동이 있을때마다 img 실행

const prepare = gulp.series([clean, img])
// img는 시간이 오래걸리므로 prepare에 넣음

const assets = gulp.series([pug, styles, js])

const live = gulp.parallel([webserver, watch])

export const build = gulp.series([prepare, assets]);

export const dev = gulp.series([build, live]);
//  export는 package.json에서 쓸 함수에만 적용해주면 됨
// const gulp = require("gulp"); 
// 구 자바스크립트


export const deploy = gulp.series([build, gh, clean])
