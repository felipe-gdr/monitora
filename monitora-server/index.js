var Firebase = require('firebase');
var _ = require('lodash');
var moment = require('moment');

var ChecaAplicativo = require('./checa-aplicativo');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var aplicativosRef = monitoraRef.child('aplicativos');
var eventosRef = monitoraRef.child('eventos');

var INTERVALO_EXECUCAO = 20000;

var checaTodosOsAplicativos = function () {
  aplicativosRef.once('value', function(snap) {
    var aplicativos = snap.val();

    for(var key in aplicativos) {
      var aplicativo = aplicativos[key];
      aplicativo.key = key;

      new ChecaAplicativo(aplicativo).checaStatus(function(mensagem) {
        if(mensagem) {
          aplicativosRef.child(this.data.key).set(this.data);

          var novoEventoRef = eventosRef.push({
            aplicativoKey: this.data.key,
            dataEvento: new Date().getTime(),
            mensagem: mensagem
          });

          var chaveEvento = novoEventoRef.key();

          console.log('Chave Evento: ', chaveEvento);

          aplicativosRef.child(this.data.key + '/eventos/' + chaveEvento).set(true);
        }
      });

    }
  });
};

setInterval(checaTodosOsAplicativos, INTERVALO_EXECUCAO);
