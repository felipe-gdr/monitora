var Firebase = require('firebase');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var eventosRef = monitoraRef.child('eventos');
var aplicativosRef = monitoraRef.child('aplicativos');

eventosRef.set(null);

aplicativosRef.on('child_added', function(snap) {
  snap.ref().child('eventos').set(null);
});
