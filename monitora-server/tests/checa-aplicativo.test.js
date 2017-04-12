var ChecaAplicativo = require('../checa-aplicativo');
var appComplete = require('./apps').appComplete
var expect = require('chai').expect


var app = {}

describe('ChecaAplicativo', function() {
  beforeEach(function(){
    app = appComplete()
  });

  it('monta url final para Populis I', function() {
    var urlFinal = new ChecaAplicativo(app).urlFinal('http://localhost:8080/populis');
    expect(urlFinal).to.equal('http://localhost:8080/populis/informacoes.jsp');
  });

  it('monta url final para Populis II', function() {
    app.nome = 'Populis II'
    var urlFinal = new ChecaAplicativo(app).urlFinal('http://localhost:8080/populisII-web');
    expect(urlFinal).to.equal('http://localhost:8080/populisII-web/rest/administracao/info');
  });

  it('monta label para aplicativo', function() {
    var label = new ChecaAplicativo(app).label(app);
    expect(label).to.equal('Empresa 2 : Populis I');
  });

  it('monta label para node', function() {
    var label = new ChecaAplicativo(app).label(app.cluster.master);
    expect(label).to.equal('master');
  });

  it('parse detalhes servidor Populis II', function() {
    app.nome = 'Populis II'

    var detalhesServidor = new ChecaAplicativo(app).parseDetalhesServidor(JSON.stringify(app.detalhesServidor))

    expect(detalhesServidor).to.deep.equal(app.detalhesServidor);
  });  

  it('parse detalhes servidor Populis II', function() {
    var body = '<html><body class="Xbody"><table cellspacing="2" width="100%"><tbody><tr><td>&nbsp;{"detalhes": "esses são detalhes"}</td></tr></tbody></table></body></html>'

    var detalhesServidor = new ChecaAplicativo(app).parseDetalhesServidor(body)

    expect(detalhesServidor).to.deep.equal({"detalhes": "esses são detalhes"});
  });
});