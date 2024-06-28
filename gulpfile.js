const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require ("gulp-uglify");
const obfuscate = require ("gulp-obfuscate");
const imagemin = require ("gulp-imagemin");

function comprimeImagens(){
  return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript () {
  return gulp.src('./source/scripts/*js')
    .pipe(uglify())
    .pipe(obfuscate()) // isso torna o arquivo ilegivel
    .pipe(gulp.dest('./build/scripts'));
}

function compilaSass() {
  return gulp.src("./source/styles/main.scss") // Pega os arquivos da pasta
    .pipe(sourcemaps.init()) // transforma o arquivo compilado .css ao arquivo fonte .scss para melhor depuração no navegador
    .pipe(sass({
      outputStyle: 'compressed' // Deixa o arquivo comprimido = menos pesado
    })) // Executar a compilação do sass
    .pipe(sourcemaps.write('./maps')) // Escrevemos os sourcemaps na mesma pasta dos arquivos comprimidos.
    .pipe(gulp.dest("./build/styles")); // Salvamos os arquivos comprimidos e os sourcemaps na pasta styles dentro de build
}

// exports.default = funcaoPadrao; //Tarefas publicas, são as que exportamos
// exports.default = gulp.series(funcaoPadrao, dizOi); // Tarefa em serie, aguarda o fechamento de uma para a proxima se iniciar
// exports.default = gulp.parallel(funcaoPadrao, dizOi); // Tarefa em paralela, todas se iniciam juntas e fecham na respectiva ordem
exports.default = function(){
  gulp.watch('./source/styles/*.scss', {ignoreInitial: false }, gulp.series(compilaSass))
  gulp.watch('./source/scripts/*js', {ignoreInitial: false }, gulp.series(comprimeJavaScript))
  gulp.watch('./source/images/*', {ignoreInitial: false }, gulp.series(comprimeImagens))
};