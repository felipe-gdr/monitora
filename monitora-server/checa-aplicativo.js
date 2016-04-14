var request = require('request');
var moment = require('moment');

module.exports = ChecaAplicativo = function (aplicativoJson) {
  this.data = aplicativoJson;
}

ChecaAplicativo.prototype.TIMEOUT = 10000;
ChecaAplicativo.prototype.DOWN_COUNT = 3;

ChecaAplicativo.prototype.label = function () {
  return this.data.cliente + " : " + this.data.nome;
}

ChecaAplicativo.prototype.urlFinal = function() {
    if(this.data.nome == 'Populis II') {
      return this.data.url + '/rest/administracao/info';
    } else {
      return this.data.url;
    }
}

ChecaAplicativo.prototype.checaStatus = function (callback) {
  var urlFinal = this.urlFinal();

  return request({
    url: urlFinal,
    timeout: this.TIMEOUT
  }, function(error, response, body) {

    this.data.statusAnterior = this.data.status || 'unknow';

    var houveAtualizacao;

    if(error && error.code == 'ETIMEDOUT') {
      console.log('timeout', this.data.nome, this.data.cliente);
      houveAtualizacao = this._handleError(error, response);
    } else if(response && response.statusCode === 200) {
      houveAtualizacao = this._handleSucesso(body, response);
    } else {
      houveAtualizacao = this._handleError(error, response);
    }

    callback.bind(this)(houveAtualizacao);

  }.bind(this));
}

ChecaAplicativo.prototype._handleError = function(error, response) {
  if(this.data.statusAnterior == 'up' || this.data.statusAnterior == 'unknow') {
    this.data.errorCount = 1;
    this.data.desde = moment().format("DD/MM/YYYY HH:mm");
    this.data.status = 'unstable';

    return this.label() + " ficou instável";
  } else {
    if(this.data.errorCount > this.DOWN_COUNT) {
      return null;
    } else if(this.data.errorCount == this.DOWN_COUNT) {
      this.data.errorCount = this.data.errorCount ? this.data.errorCount + 1 : 1;
      this.data.status = 'down';
      this.data.desde = moment().format("DD/MM/YYYY HH:mm");
      this.data.ultimaAlteracao = 'caiu';

      return this.label() + " caiu";
    } else {
      this.data.errorCount = this.data.errorCount ? this.data.errorCount + 1 : 1;

      return this.label() + " continua instável";
    }
  }

  this.data.errorCode = response ? response.statusCode : null;
};

ChecaAplicativo.prototype._handleSucesso = function(body, response) {
  if(this.data.nome == 'Populis II') {
    this.data.detalhesPop2 = eval('(' + body + ')');;
  }

  if(this.data.statusAnterior != 'up') {
    this.data.status = 'up';
    this.data.desde = moment().format("DD/MM/YYYY HH:mm");
    this.data.ultimaAlteracao = 'subiu';

    return this.label() + " subiu";
  } else {
    return null;
  }
};
