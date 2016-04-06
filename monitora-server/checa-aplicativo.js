var request = require('request');
var moment = require('moment');

module.exports = ChecaAplicativo = function (aplicativoJson) {
  this.data = aplicativoJson;
}

ChecaAplicativo.prototype.TIMEOUT = 3000;

ChecaAplicativo.prototype.urlFinal = function() {
    if(this.data.nome == 'Populis II') {
      return this.data.url + '/rest/administracao/info';
    } else {
      return this.data.url;
    }
}

ChecaAplicativo.prototype.checaStatus = function (callback) {
  var urlFinal = this.urlFinal();

  console.log('checando url', urlFinal);

  return request({
    url: urlFinal,
    timeout: this.TIMEOUT
  }, function(error, response, body) {

    this.data.statusAnterior = this.data.status || 'unknow';

    if(error && error.code == 'ETIMEDOUT') {
      this._handleTimeout();
    } else if(response && response.statusCode === 200) {
      this._handleSucesso(body, response);
    } else {
      this._handleError(error, response);
    }

    // Verifica se houve mudança no status
    if(this.data.statusAnterior !== this.data.status) {
      this.data.desde = moment().format("DD/MM/YYYY HH:mm");

      if(this.data.status == 'up') {
        this.data.ultimaAlteracao = 'subiu';
      } else {
        this.data.ultimaAlteracao = 'caiu';
      }
    }

    callback.bind(this)();

  }.bind(this));
}

ChecaAplicativo.prototype._handleError = function(error, response) {
  this.data.status = 'down';
  this.data.statusCode = response ? response.statusCode : null;
};

ChecaAplicativo.prototype._handleSucesso = function(body, response) {
  this.data.status = 'up';
  this.data.statusCode = response.statusCode;

  if(this.data.nome == 'Populis II') {
    this.data.detalhesPop2 = eval('(' + body + ')');;
  }
};

ChecaAplicativo.prototype._handleTimeout = function() {
  this.data.status = 'timeout';
  this.data.statusCode = null;
  console.log('timeout');
};
