function funcaoPadrao(callback) {
  console.log("Executando via Gulp");
  callback();
}

function dizOi(callback) {
  console.log("Ola, Gulp");
  dizTchau(); // Tarefas privadas, são as que sao chamadas por outras functions
  callback();
}

function dizTchau() {
  console.log("Tchau Gulp");
}

exports.default = funcaoPadrao; //Tarefas publicas, são as que exportamos
exports.dizOi = dizOi;
