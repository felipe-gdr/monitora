var moment = require('moment');
var _ = require('lodash');

module.exports = OrganizaServidores = function(aplicativos) {
  this.aplicativos = aplicativos
}

OrganizaServidores.prototype.getListaAplicativos = function() {
    var servidores = this.getServidoresOrganizados();

    if(!servidores) {
      return null
    }

    var lista = []

    servidores.forEach((serv) => {
      serv.apps.forEach((app) => {
        lista.push({
          ip: serv.ip,
          nomeServidor: serv.nome,
          tipo: serv.tipo,
          nomeApp: app.nome,
          cliente: app.cliente,
          url: app.url,
          status: app.status
        })
      })
    })

    return lista;
}

OrganizaServidores.prototype.getServidoresOrganizados = function() {
    if(!this.aplicativos || this.aplicativos.length == 0) {
      return null;
    }

    var serversWeb = this._organizaServidoresWeb();
    var serversCalculo = this._organizaServidoresCalculo();

    return _.sortBy(_.union(serversWeb, serversCalculo), ['ip'])
}

OrganizaServidores.prototype._organizaServidoresWeb = function() {
  var servers = {}

  this.aplicativos.forEach((app) => {
    var ip = app.detalhesServidor.ipServidor

    if(!servers[ip]) {
      servers[ip] = {
        ip: ip,
        nome: app.detalhesServidor.nomePcServidor,
        tipo: 'web',
        apps: []
      }
    }

    servers[ip].apps.push({
      cliente: app.cliente,
      nome: app.nome,
      status: app.status,
      url: app.url
    })
  })

  return _.values(servers);
}

OrganizaServidores.prototype._organizaServidoresCalculo = function() {
  var servers = {}

  this.aplicativos.forEach((app) => {
    var calculos = _.filter(app.detalhesServidor.calculos, (calc) => calc.emUsoPopulisCalculo == 'S');

    if(!calculos) {
      return servers;
    }

    calculos.forEach((calc) => {
      var ip = calc.locationPopulisCalculo;

      if(!servers[ip]) {
        servers[ip] = {
          ip: ip,
          nome: null,
          apps: [],
          tipo: 'calc',
        }
      }

      servers[ip].apps.push({
        cliente: app.cliente,
        nome: calc.versaoPopulisCalculo,
        status: calc.statusPopulisCalculo == '1' ? 'up' : 'down',
        url: null
      })

    })
  })

  return _.values(servers);
}
