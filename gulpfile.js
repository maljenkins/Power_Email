const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync");
const server = browserSync.create();


const paths = {
  html: {
    src: 'src/templates/**/*'
  },
  data: {
    src: 'src/data/*.json'
  }
};

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist/'
    }
  });
  done();
}

function nunjucks(done) {
  gulp.src("./src/templates/*")
    .pipe(plumber())
    .pipe(
      data(function () {
        return require("./src/data/global.json");
      })
    )
    .pipe(
      nunjucksRender({
        path: ["./src/templates/"],
      })
    )
    .pipe(gulp.dest("./dist/"));
  done();
}

const watch = () => gulp.watch([paths.html.src, paths.data.src], gulp.series(nunjucks, reload));

const dev = gulp.series(nunjucks, style, serve, watch);
exports.default = dev;

