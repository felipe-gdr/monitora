var request = require('request');
var moment = require('moment');

module.exports = ChecaAplicativo = function (aplicativoJson) {
  this.data = aplicativoJson;
}

ChecaAplicativo.prototype.TIMEOUT = 3000;
ChecaAplicativo.prototype.DOWN_COUNT = 10;

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

    console.log('atualizou, unstable', this.data.nome, this.data.cliente);
    return true;
  } else {
    if(this.data.errorCount > 6) {
      return false;
    } else if(this.data.errorCount == 6) {
      this.data.errorCount = this.data.errorCount ? this.data.errorCount + 1 : 1;
      this.data.status = 'down';
      this.data.desde = moment().format("DD/MM/YYYY HH:mm");
      this.data.ultimaAlteracao = 'caiu';

      console.log('atualizou, caiu', this.data.nome, this.data.cliente);
      return true;
    } else {
      this.data.errorCount = this.data.errorCount ? this.data.errorCount + 1 : 1;

      return true;  
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

    console.log('atualizou, subiu', this.data.nome, this.data.cliente);
    return true;
  } else {
    return false;
  }
};
