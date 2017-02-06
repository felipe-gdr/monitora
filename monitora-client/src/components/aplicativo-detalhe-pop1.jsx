var React = require('react');
var _ = require('lodash');
var moment = require('moment');

var List = require('./list').List
var ListItem = require('./list').ListItem

module.exports = React.createClass({
    render: function() {
      var aplicativo = this.props.aplicativo
      var detalhes = aplicativo.detalhesServidor

      var calculos = _.filter(detalhes.calculos, (calc) => calc.emUsoPopulisCalculo == 'S')
      var versaoCalculo = _.find(calculos, (calc) => calc.servicoVersionPopulisCalculo).servicoVersionPopulisCalculo
      var calculosUp = _.filter(calculos, (calc) => calc.statusPopulisCalculo == 1).length
      var calculosDown = calculos.length - calculosUp

      return (
        <div className="mdl-grid detalhe-pop1">
          <div className="mdl-cell mdl-cell--12-col"><h3>Web</h3></div>

          <div className="mdl-cell mdl-cell--2-col label">Versão</div>
          <div className="mdl-cell mdl-cell--2-col value">{detalhes.versaoPopulisWeb}</div>

          <div className="mdl-cell mdl-cell--2-col label">IP Servidor</div>
          <div className="mdl-cell mdl-cell--2-col value">{detalhes.nomePcServidor} - {detalhes.ipServidor}</div>

          <div className="mdl-cell mdl-cell--2-col label">Status</div>
          <div className="mdl-cell mdl-cell--2-col value">
            <div
              title={aplicativo.status}
              className={'status ' + aplicativo.status } />
          </div>

          <div className="mdl-cell mdl-cell--12-col"><h3>Cálculo</h3></div>

          <div className="mdl-cell mdl-cell--2-col label">Versão</div>
          <div className="mdl-cell mdl-cell--2-col value">{versaoCalculo}</div>

          <div className="mdl-cell mdl-cell--2-col label">Up </div>
          <div className="mdl-cell mdl-cell--2-col value">{calculosUp}</div>

          <div className="mdl-cell mdl-cell--2-col label">Down</div>
          <div className="mdl-cell mdl-cell--2-col value">{calculosDown}</div>

          <div className="mdl-cell mdl-cell--12-col">
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp table-calculos">
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
    }
});
