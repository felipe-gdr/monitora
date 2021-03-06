var request = require('request');
var moment = require('moment');
var _ = require('lodash');

module.exports = ChecaAplicativo = function (aplicativoJson) {
  this.data = aplicativoJson;
}

ChecaAplicativo.prototype.TIMEOUT = 10000;
ChecaAplicativo.prototype.DOWN_COUNT = 3;
ChecaAplicativo.prototype.APP_CHECKURL_MAP = {
  'Populis II': '/rest/administracao/info',
  'Populis I': '/informacoes.jsp'
};

ChecaAplicativo.prototype.label = function (baseApp) {
  if(baseApp.nomeNode) {
    return baseApp.nomeNode;
  } else {
    return baseApp.cliente + " : " + baseApp.nome;
  }

}

ChecaAplicativo.prototype.urlFinal = function(baseUrl) {
  return baseUrl + this.APP_CHECKURL_MAP[this.data.nome];
}

ChecaAplicativo.prototype.parseDetalhesServidor = function(body) {
  if(this.data.nome == 'Populis II') {
    // Pega o JSON direto da resposta do request
    return eval('(' + body + ')');
  } else if(this.data.nome == 'Populis I') {
    // Pega o JSON de dentro do HTML retornado pelo request
    var match = /.*<tr><td>&nbsp;(.*)<\/td>/g.exec(body)
    if(match != null) {
      return eval('(' + match[1].trim() + ')');
    }
  }
}

ChecaAplicativo.prototype.checaStatus = function (callback) {
  this.checaAplicativo(this.data, callback);

  if(this.data.cluster) {
    _.keys(this.data.cluster).forEach(function(nomeNode) {
      var nodeCluster  = this.data.cluster[nomeNode];
      nodeCluster.nomeNode = nomeNode;
      this.checaAplicativo(nodeCluster, callback);
    }.bind(this));
  }
}

ChecaAplicativo.prototype.checaAplicativo = function (baseApp, callback) {
  var urlFinal = this.urlFinal(baseApp.url);

  return request({
    url: urlFinal,
    timeout: this.TIMEOUT,
    encoding: 'binary'
  }, function(error, response, body) {

    baseApp.statusAnterior = baseApp.status || 'unknow';

    var houveAtualizacao;

    if(error && error.code == 'ETIMEDOUT') {
      houveAtualizacao = this.handleError(baseApp, error, response);
    } else if(response && response.statusCode === 200) {
      houveAtualizacao = this.handleSucesso(baseApp, body, response);
    } else {
      houveAtualizacao = this.handleError(baseApp, error, response);
    }

    if(callback) {
      callback.bind(this)(houveAtualizacao);
    }

  }.bind(this));
}

ChecaAplicativo.prototype.handleError = function(baseApp, error, response) {
  if(baseApp.statusAnterior == 'up' || baseApp.statusAnterior == 'unknow') {
    baseApp.errorCount = 1;
    baseApp.desde = moment().format("DD/MM/YYYY HH:mm");
    baseApp.status = 'unstable';

    return this.label(baseApp) + " ficou instável";
  } else {
    if(baseApp.errorCount > this.DOWN_COUNT) {
      return null;
    } else if(baseApp.errorCount == this.DOWN_COUNT) {
      baseApp.errorCount = baseApp.errorCount ? baseApp.errorCount + 1 : 1;
      baseApp.status = 'down';
      baseApp.desde = moment().format("DD/MM/YYYY HH:mm");
      baseApp.ultimaAlteracao = 'caiu';

      return this.label(baseApp) + " caiu";
    } else {
      baseApp.errorCount = baseApp.errorCount ? baseApp.errorCount + 1 : 1;

      return this.label(baseApp) + " continua instável";
    }
  }

  baseApp.errorCode = response ? response.statusCode : null;
};

ChecaAplicativo.prototype.handleSucesso = function(baseApp, body, response) {
  var detalhesServidorAntigo = baseApp.detalhesServidor
  var detalhesServidorNovo = this.parseDetalhesServidor(body)

  baseApp.detalhesServidor = detalhesServidorNovo

  if(baseApp.statusAnterior != 'up') {
    baseApp.status = 'up';
    baseApp.desde = moment().format("DD/MM/YYYY HH:mm");
    baseApp.ultimaAlteracao = 'subiu';

    return this.label(baseApp) + " subiu";
  } else if(!_.isEqual(detalhesServidorNovo, detalhesServidorAntigo)) {
    return this.label(baseApp) + " atualizou";
  } else {
    return null;
  }
};
