var React = require('react');

module.exports = React.createClass({
  render: function () {
    return <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Monitoramento</span>
      <nav className="mdl-navigation">
        <a className="mdl-navigation__link" href="">Grid</a>
        <a className="mdl-navigation__link" href="">Configuração</a>
        <a className="mdl-navigation__link" href="">Link</a>
        <a className="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>
  }
})
