var React = require('react');
var _ = require('lodash');
var moment = require('moment');

var List = require('./list').List
var ListItem = require('./list').ListItem

module.exports = React.createClass({
  render: function() {
    var aplicativo = this.props.aplicativo
    var detalhes = aplicativo.detalhesServidor
    var versaoWeb = detalhes.versaoPopulisWeb || (detalhes.versaoPopulis + '_' + detalhes.numeroBuild)

    console.log('app-detalhe-pop1#render', aplicativo)

    return (
      <div className="detalhe-pop1">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col"><h3>Web</h3></div>

          <div className="mdl-cell mdl-cell--2-col label">Versão</div>
          <div className="mdl-cell mdl-cell--2-col value">{versaoWeb}</div>

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
    var aplicativo = this.props.aplicativo
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
        <div className="mdl-cell mdl-cell--12-col"><h3>Cálculo</h3></div>

        <div className="mdl-cell mdl-cell--2-col label">Versão</div>
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
    var aplicativo = this.props.aplicativo
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
