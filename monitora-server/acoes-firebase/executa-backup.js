var Firebase = require('firebase');
var fs = require('fs');
var moment = require('moment');

var monitoraRef = new Firebase('https://monitora.firebaseio.com/')
var aplicativosRef = monitoraRef.child('aplicativos');
var aplicativosBackupRef = monitoraRef.child('aplicativos-backup');

var PROPRIEDADES_BASICAS = ['nome', 'cliente', 'url', 'key'];

aplicativosRef.once('value', function(snap) {
  var aplicativos = snap.val();

  // deixa apenas propriedades básicas
  for (var key in aplicativos) {
    for (var key2 in aplicativos[key]) {
      if(PROPRIEDADES_BASICAS.indexOf(key2) < 0) {
        delete aplicativos[key][key2];
      }
    }

    // salva no node aplicativos-backup
    aplicativosBackupRef.child(aplicativos[key].cliente + '_' + aplicativos[key].nome).set(aplicativos[key]);

  }

  // escreve em arquivo
  fs.writeFile('aplicativos-backup_' + moment().format('YYYYMMDDHHmmSS') + '.json', JSON.stringify(aplicativos));
});
