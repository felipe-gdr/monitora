var Firebase = require('firebase');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var eventosRef = monitoraRef.child('eventos');
var aplicativosRef = monitoraRef.child('aplicativos');

aplicativosRef.once('child_added', function(snap) {
  var aplicativo = snap.val();

  delete aplicativo.eventos;

  console.log('Removendo eventos de: ' + snap.key());

  aplicativosRef.child(snap.key()).set(aplicativo);
});
