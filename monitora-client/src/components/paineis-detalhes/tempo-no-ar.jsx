var React = require('react');

var PainelDetalhe = require('./painel-detalhe');

module.exports = React.createClass({
  render: function() {
    return (
      <PainelDetalhe>
        <h5>Tempo no ar</h5>
        <div>
          <ul className="demo-list-icon mdl-list">
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">
                <i className="material-icons mdl-list__item-icon">arrow_upward</i>
                últimas 24 horas: 95,5%
              </span>
            </li>
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">
                <i className="material-icons mdl-list__item-icon">arrow_upward</i>
                últimos 7 dias: 97,2%
              </span>
            </li>
          </ul>
        </div>
      </PainelDetalhe>
    );
  }
})
