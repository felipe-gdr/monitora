var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Monitora Server',
  description: 'Parte servidor do Monitora, responsavel por fazer a verificacao nas bases dos clientes',
  script: 'E:\\Populis_SI_Data\\Monitora\\monitora-repo\\monitora-server\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();