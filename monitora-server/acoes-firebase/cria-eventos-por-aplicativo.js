// DEPRECIADO //
var Firebase = require('firebase');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var eventosRef = monitoraRef.child('eventos');
var eventosPorAplicativoRef = monitoraRef.child('eventosPorAplicativo');

var count = 0;

eventosRef.on('child_added', function(snap) {
  var evento = snap.val();
  var aplicativoKey = evento.aplicativoKey;

  eventosPorAplicativoRef.child(aplicativoKey + '/' + snap.key()).set(evento);

  console.log('Evento adicionado:', ++count);
});
