var assert = require('chai').assert;
var expect = require('chai').expect;

var Favicon = require('../src/components/favicon');

describe('Favicon', function () {

  describe('#getGlobalStatus', function() {

    it('retorna "down" quando há ao menos 1 aplicativo "unstable"', function() {
      var status = new Favicon().getGlobalStatus([
          {status: 'up'},
          {status: 'up'},
          {status: 'unstable'}
        ])

      assert.equal('down', status);
    });

    it('retorna "down" quando há ao menos 1 aplicativo "down"', function() {
      var status = new Favicon().getGlobalStatus([
          {status: 'up'},
          {status: 'up'},
          {status: 'down'}
        ])

      assert.equal('down', status);
    });

    it('retorna "up" quando todos os aplicativos estão "up"', function() {
      var status = new Favicon().getGlobalStatus([
          {status: 'up'},
          {status: 'up'},
          {status: 'up'}
        ])

      assert.equal('up', status);
    });

    it('retorna "down" quando ao menos 1 node do cluster está "unstable"', function() {
      var status = new Favicon().getGlobalStatus([
          {status: 'up', cluster: {
            master: {status: 'unstable'}, slave: {status: 'up'}
          }},
        ])

      assert.equal('down', status);
    });

    it('retorna "down" quando ao menos 1 node do cluster está "down"', function() {
      var status = new Favicon().getGlobalStatus([
          {status: 'up', cluster: {
            master: {status: 'unstable'}, slave: {status: 'up'}
          }},
        ])

      assert.equal('down', status);
    });

    it('retorna "up" quando todos os nodes do cluster estão "up"', function() {
      var status = new Favicon().getGlobalStatus([
          {status: 'up', cluster: {
            master: {status: 'up'}, slave: {status: 'up'}
          }},
        ])

      assert.equal('up', status);
    });

  });

});
