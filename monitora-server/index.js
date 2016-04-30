var Firebase = require('firebase');
var _ = require('lodash');
var moment = require('moment');

var ChecaAplicativo = require('./checa-aplicativo');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var aplicativosRef = monitoraRef.child('aplicativos');
var eventosRecentesRef = monitoraRef.child('eventosRecentes');
var eventosPorAplicativo = monitoraRef.child('eventosPorAplicativo');

var INTERVALO_EXECUCAO = 20000;

var QTDE_EVENTOS_RECENTES = 50;

var incluirEvento(appKey, mensagem) {
  var eventoObj = {
    aplicativoKey: appKey,
    dataEvento: new Date().getTime(),
    mensagem: mensagem
  };

 // Inclui evento na lista de eventos recentes
  var novoEventoRef = eventosRecentesRef.push(eventoObj);

  var chaveEvento = novoEventoRef.key();

  console.log('Chave Evento: ', chaveEvento);

  // Inclui evento na lista de eventos por aplicativo
  eventosPorAplicativo.child(appKey + '/' + chaveEvento).set(eventoObj);
}

/*
 * Remove eventos recentes para deixar apenas a quantidade máxima desejada.
 */
var limpaEventosRecentes() {
  eventosRecentesRef.startAt(QTDE_EVENTOS_RECENTES).on('child_added', function(snap) {
    snap.remove();
  });
}

var checaTodosOsAplicativos = function () {
  aplicativosRef.once('value', function(snap) {
    var aplicativos = snap.val();

    for(var key in aplicativos) {
      var aplicativo = aplicativos[key];
      aplicativo.key = key;

      new ChecaAplicativo(aplicativo).checaStatus(function(mensagem) {
        if(mensagem) {
          aplicativosRef.child(this.data.key).set(this.data);

          incluirEvento(this.data.key, mensagem);
          limpaEventosRecentes();
        }
      });

    }
  });
};

setInterval(checaTodosOsAplicativos, INTERVALO_EXECUCAO);
