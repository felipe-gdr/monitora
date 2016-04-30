var Firebase = require('firebase');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var eventosRef = monitoraRef.child('eventos');
var eventosRecenterRef = monitoraRef.child('eventosRecentes');

eventosRef.limitToLast(50).once('value', function(snap) {
  var eventos = snap.val();

  eventosRecenterRef.set(eventos, function(error) {
    console.log('Sucesso? ', !error);
    process.exit();
  });
});
