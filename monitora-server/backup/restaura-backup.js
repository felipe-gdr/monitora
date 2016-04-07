var Firebase = require('firebase');
var fs = require('fs');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var aplicativosRef = monitoraRef.child('aplicativos');
var aplicativosBackupRef = monitoraRef.child('aplicativos-backup');

aplicativosBackupRef.once('value', function(snap) {
  // salva no node aplicativos
  aplicativosRef.set(snap.val(), function() {
    process.exit();
  });
});
