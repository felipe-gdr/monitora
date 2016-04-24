var Firebase = require('firebase');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var eventosRef = monitoraRef.child('eventos');
var aplicativosRef = monitoraRef.child('aplicativos');

eventosRef.once('value', function(snap) {
  var eventos = snap.val();

  for (var key in eventos) {
    var evento = eventos[key];
    var aplicativoKey = evento.aplicativoKey;

    console.log('Linkando evento para aplicativo: ' + aplicativoKey);

    aplicativosRef.child(aplicativoKey + '/eventos/' + key).set(true);
  }
});
