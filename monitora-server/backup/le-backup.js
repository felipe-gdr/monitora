var Firebase = require('firebase');
var fs = require('fs');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var aplicativosRef = monitoraRef.child('aplicativos');

aplicativosRef.once('value', function(snap) {
  console.log(JSON.stringify(snap.val()));
  fs.writeFile('aplicativos-backup.json', JSON.stringify(snap.val()));
});
