// DEPRECIADO //
var Firebase = require('firebase');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var eventosPorAplicativoRef = monitoraRef.child('eventosPorAplicativo');

var count = 0;

var eventosParaExcluir = [];

eventosPorAplicativoRef.on('child_added', function(snap) {
  console.log('verificando', snap.key());

  eventosPorAplicativoRef.child(snap.key()).endAt(50).on('child_added', function(snapEve) {
    if(snapEve.val().mensagem && !snapEve.val().dataEvento) {
      count++

      console.log('Removendo evento sem data de:', snap.key(), snapEve.val().mensagem, snapEve.val().dataEvento,  ++count);

      eventosParaExcluir.push(snap.key() + '/' + snapEve.key());
    }
  });
});

setTimeout(function () {
  eventosParaExcluir.forEach(function(key) {
    eventosPorAplicativoRef.child(key).remove();
  });

}, 10000);
