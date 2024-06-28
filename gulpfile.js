const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

function compilaSass() {
  return gulp.src("./source/styles/main.scss") // Pega os arquivos da pasta
    .pipe(sourcemaps.init()) // transforma o arquivo compilado .css ao arquivo fonte .scss para melhor depuração no navegador
    .pipe(sass({
      outputStyle: 'compressed' // Deixa o arquivo comprimido = menos pesado
    })) // Executar a compilação do sass
    .pipe(sourcemaps.write('./maps')) // Escrevemos os sourcemaps na mesma pasta dos arquivos comprimidos.
    .pipe(gulp.dest("./build/styles")); // Salvamos os arquivos comprimidos e os sourcemaps na pasta styles dentro de build
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