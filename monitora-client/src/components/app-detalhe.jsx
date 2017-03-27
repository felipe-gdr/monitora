var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');
var moment = require('moment');

// Url Firebase
var ROOT_URL = require('../constantes').ROOT_URL;

module.exports = React.createClass({
    mixins: [ReactFire],

    getInitialState: function() {
        return {aplicativo: null};
    },

    componentWillMount: function() {
        this.fbAplicativo = new Firebase(ROOT_URL + 'aplicativos/' + this.props.params.app);
        this.bindAsObject(this.fbAplicativo, 'aplicativo');
    },

    render: function() {
      var aplicativo = this.state.aplicativo

      if (!aplicativo) {
          return null;
      }

      return <div className="aplicativo-detalhe">
          <h3 className="titulo-aplicativo">
              {aplicativo.cliente} - {aplicativo.nome}
          </h3>
          <h6 className="url">
            <a href={aplicativo.url} target="_blank">{aplicativo.url}</a>
          </h6>
          {this.renderDetalhes()}
      </div>
    },

    renderDetalhes: function() {
      var aplicativo = this.state.aplicativo
      var detalhes = aplicativo.detalhesServidor
      var versaoWeb = detalhes.versaoPopulisWeb || (detalhes.versaoPopulis + '_' + detalhes.numeroBuild)

      return (
        <div className="detalhes">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col"><h3>Web</h3></div>

            <div className="mdl-cell mdl-cell--1-col label">Versao</div>
            <div className="mdl-cell mdl-cell--3-col value">{versaoWeb}</div>

            <div className="mdl-cell mdl-cell--2-col label">IP Servidor</div>
            <div className="mdl-cell mdl-cell--2-col value">{detalhes.nomePcServidor} - {detalhes.ipServidor}</div>

            <div className="mdl-cell mdl-cell--2-col label">Status</div>
            <div className="mdl-cell mdl-cell--2-col value">
              <div
                title={aplicativo.status}
                className={'status ' + aplicativo.status } />
            </div>
          </div>
          {this.renderCalculo()}
          {this.renderCluster()}
        </div>
      )
    },

    renderCalculo: function() {
      var aplicativo = this.state.aplicativo
      var detalhes = aplicativo.detalhesServidor

      if(!detalhes || !detalhes.calculos) {
        return null;
      }

      var calculos = _.filter(detalhes.calculos, (calc) => calc.emUsoPopulisCalculo == 'S')
      var versaoCalculo = _.find(calculos, (calc) => calc.servicoVersionPopulisCalculo).servicoVersionPopulisCalculo
      var calculosUp = _.filter(calculos, (calc) => calc.statusPopulisCalculo == 1).length
      var calculosDown = calculos.length - calculosUp

      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col"><h3>Calculo</h3></div>

          <div className="mdl-cell mdl-cell--2-col label">Versao</div>
          <div className="mdl-cell mdl-cell--2-col value">{versaoCalculo}</div>

          <div className="mdl-cell mdl-cell--2-col label">Up </div>
          <div className="mdl-cell mdl-cell--2-col value">{calculosUp}</div>

          <div className="mdl-cell mdl-cell--2-col label">Down</div>
          <div className="mdl-cell mdl-cell--2-col value">{calculosDown}</div>

          <div className="mdl-cell mdl-cell--12-col">
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">Servidor</th>
                  <th className="mdl-data-table__cell--non-numeric">Nome</th>
                  <th className="mdl-data-table__cell--non-numeric">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  calculos.map((calc) => {
                    return (
                      <tr key={calc.versaoPopulisCalculo}>
                        <td className="mdl-data-table__cell--non-numeric">{calc.locationPopulisCalculo}</td>
                        <td className="mdl-data-table__cell--non-numeric">{calc.versaoPopulisCalculo}</td>
                        <td className="mdl-data-table__cell--non-numeric">
                          <div
                            title={calc.statusStrPopulisCalculo}
                            className={'status ' + (calc.statusPopulisCalculo == 1 ? 'up' : 'down')}></div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      )
    },

    renderCluster: function() {
      var aplicativo = this.state.aplicativo
      var cluster = aplicativo.cluster

      if(!cluster) {
        return null;
      }

      var nodesUp = _.filter(cluster, (node) => node.status == 'up').length
      var nodesDown = Object.keys(cluster).length - nodesUp

      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col"><h3>Cluster</h3></div>

          <div className="mdl-cell mdl-cell--2-col"></div>
          <div className="mdl-cell mdl-cell--2-col label">Up </div>
          <div className="mdl-cell mdl-cell--2-col value">{nodesUp}</div>
          <div className="mdl-cell mdl-cell--2-col label">Down</div>
          <div className="mdl-cell mdl-cell--2-col value">{nodesDown}</div>
          <div className="mdl-cell mdl-cell--2-col"></div>

            <div className="mdl-cell mdl-cell--12-col">
              <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric">Nome</th>
                    <th className="mdl-data-table__cell--non-numeric">Servidor</th>
                    <th className="mdl-data-table__cell--non-numeric">Porta</th>
                    <th className="mdl-data-table__cell--non-numeric">Url local</th>
                    <th className="mdl-data-table__cell--non-numeric">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    _.values(cluster).map((node) => {
                      var match = /.*\/\/(.*):(\d{4})\/.*/g.exec(node.url)
                      var server = match[1];
                      var port = match[2];

                      return (
                        <tr key={node.nomeNode}>
                          <td className="mdl-data-table__cell--non-numeric">{node.nomeNode}</td>
                          <td className="mdl-data-table__cell--non-numeric">{server}</td>
                          <td className="mdl-data-table__cell--non-numeric">{port}</td>
                          <td className="mdl-data-table__cell--non-numeric">{node.url}</td>
                          <td className="mdl-data-table__cell--non-numeric">
                            <div
                              title={node.status}
                              className={'status ' + node.status}></div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>

        </div>
      )
    }
});