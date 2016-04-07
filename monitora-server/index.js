var Firebase = require('firebase');
var _ = require('lodash');
var ChecaAplicativo = require('./checa-aplicativo');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var aplicativosRef = monitoraRef.child('aplicativos');
var eventosRef = monitoraRef.child('eventos');

var INTERVALO_EXECUCAO = 5000;

var checaTodosOsAplicativos = function () {
  console.log('executando ....');
  aplicativosRef.once('value', function(snap) {
    var aplicativos = snap.val();

    for(var key in aplicativos) {
      var aplicativo = aplicativos[key];
      aplicativo.key = key;

      new ChecaAplicativo(aplicativo).checaStatus(function(houveAtualizacao) {
        if(houveAtualizacao) {
          aplicativosRef.child(this.data.key).set(this.data);
        }
      });

    }
  });
};

setInterval(checaTodosOsAplicativos, INTERVALO_EXECUCAO);
