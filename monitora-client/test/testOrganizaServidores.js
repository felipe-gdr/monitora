var assert = require('chai').assert;
var expect = require('chai').expect;
var moment = require('moment');

var OrganizaServidores = require('../src/servicos/organiza-servidores');

var aplicativos = [
  {
    cliente: "Advanta",
    nome: "Populis II",
    status: "up",
    url: "https://advanta.populisservicos.com.br/populisII-web",
    detalhesServidor: {
      ipServidor: "10.10.10.2",
      nomePcServidor: "glr-02"
    }
  },
  {
    cliente: "Amadeus",
    nome: "Populis II",
    status: "up",
    url: "https://amadeus.populisservicos.com.br/populisII-web",
    detalhesServidor: {
      ipServidor: "10.10.10.2",
      nomePcServidor: "glr-02"
    }
  },
  {
    cliente: "Advanta",
    nome: "Populis I",
    status: "up",
    url: "https://advanta.populisservicos.com.br/populis",
    detalhesServidor: {
      ipServidor: "10.10.10.1",
      nomePcServidor: "glr-01",
      calculos: [
        {
          locationPopulisCalculo: '10.10.10.3',
          statusPopulisCalculo: '1',
          emUsoPopulisCalculo: 'S'
        }
      ]
    }
  }
]

describe('OrganizaServidores', function () {
  describe('#_organizaServidoresWeb', function() {
    it('retorna os servidores web organizados', function() {
      var servidoresWeb = new OrganizaServidores(aplicativos)._organizaServidoresWeb();

      assert.isArray(servidoresWeb, '"servidoresWeb" é uma array')
      assert.lengthOf(servidoresWeb, 2, '"servidoresWeb" tem 2 servidores')

      assert.equal(servidoresWeb[0].ip, "10.10.10.2")
      assert.equal(servidoresWeb[1].ip, "10.10.10.1")

    });
  });

  describe('#_organizaServidoresCalculo', function() {
    it('retorna os servidores de cálculo organizados', function() {
      var servidoresCalculo = new OrganizaServidores(aplicativos)._organizaServidoresCalculo();

      assert.isArray(servidoresCalculo, '"servidoresCalculo" é uma array')
      assert.lengthOf(servidoresCalculo, 1, '"servidoresCalculo" tem 1 servidor')

      assert.equal(servidoresCalculo[0].ip, "10.10.10.3")
    });
  });

  describe('#getServidoresOrganizados', function() {
    it('retorna "null" quando "aplicativos" é nulo', function() {
      var organizaServidores = new OrganizaServidores(null);

      assert.isNull(organizaServidores.getServidoresOrganizados());
    });

    it('retorna todos os servidores organizados', function() {
      var servidores = new OrganizaServidores(aplicativos).getServidoresOrganizados();

      assert.isArray(servidores, '"servidores" é uma array')
      assert.lengthOf(servidores, 3, '"servidores" tem 3 servidores')

      assert.equal(servidores[0].ip, "10.10.10.1")
      assert.equal(servidores[1].ip, "10.10.10.2")
      assert.equal(servidores[2].ip, "10.10.10.3")

    });
  });

  describe('#getListaAplicativos', function() {
    it('retorna "null" quando "aplicativos" é nulo', function() {
      var organizaServidores = new OrganizaServidores(null);

      assert.isNull(organizaServidores.getListaAplicativos());
    });

    it('retorna todos os aplicativos organizados em uma lista', function() {
      var apps = new OrganizaServidores(aplicativos).getListaAplicativos();

      assert.isArray(apps, '"apps" é uma array')
      assert.lengthOf(apps, 4, '"apps" tem 3 servidores')

      assert.equal(apps[0].ip, "10.10.10.1")
      assert.equal(apps[1].ip, "10.10.10.2")
      assert.equal(apps[2].ip, "10.10.10.2")
      assert.equal(apps[3].ip, "10.10.10.3")

    });
  });
});
