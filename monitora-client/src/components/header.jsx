var React = require('react');
var Mensagens = require('./mensagens');

module.exports = React.createClass({
  render: function() {
    return  <header className="mdl-layout__header mdl-layout__header--scroll header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Monitoramento</span>
        <div className="mdl-layout-spacer"></div>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link qtde-up" href="">
            12
            <label className="mdl-button mdl-js-button mdl-button--icon"
             htmlFor="fixed-header-drawer-exp">
              <i className="material-icons">arrow_upward</i>
            </label>
          </a>
          <a className="mdl-navigation__link qtde-down" href="">
            3
            <label className="mdl-button mdl-js-button mdl-button--icon"
             htmlFor="fixed-header-drawer-exp">
              <i className="material-icons">arrow_downward</i>
            </label>
          </a>
          <Mensagens />
        </nav>
      </div>
    </header>
  }
});
