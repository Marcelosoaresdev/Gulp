const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

function compilaSass() {
  return gulp.src("./source/styles/main.scss") // Pegar os arquivos fonte
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed' // Deixa o arquivo comprimido = menos pesado
    })) // Executar a compilação do sass
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./build/styles")); // Manda os arquivos para a pasta
}

function funcaoPadrao(callback) {
  setTimeout(function () {
    console.log("Executando via Gulp");
    callback();
  }, 2000);
}

function dizOi(callback) {
  setTimeout(function () {
    console.log("Ola, Gulp");
    dizTchau(); // Tarefas privadas, são as que sao chamadas por outras functions
    callback();
  }, 1000);
}

function dizTchau() {
  console.log("Tchau Gulp");
}

// exports.default = funcaoPadrao; //Tarefas publicas, são as que exportamos
// exports.default = gulp.series(funcaoPadrao, dizOi); // Tarefa em serie, aguarda o fechamento de uma para a proxima se iniciar
exports.default = gulp.parallel(funcaoPadrao, dizOi); // Tarefa em paralela, todas se iniciam juntas e fecham na respectiva ordem
exports.dizOi = dizOi;
exports.sass = compilaSass;
exports.watch = function(){
  gulp.watch('./source/styles/*.scss', {ignoreInitial: false }, gulp.series(compilaSass))
}