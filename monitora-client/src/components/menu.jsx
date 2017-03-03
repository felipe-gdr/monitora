var React = require('react');

var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function () {
    return (
      <div className="menu">
        <button id="demo-menu-lower-right"
                className="mdl-button mdl-js-button mdl-button--icon">
          <i className="material-icons">more_vert</i>
        </button>

        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            htmlFor="demo-menu-lower-right">
          <li className="mdl-menu__item mdl-menu__item--full-bleed-divider">
            <Link to='/app'>
              <div> Aplicativos</div>
            </Link>
          </li>
          <li className="mdl-menu__item">
            <Link to='/server'>
              <div>Servidores</div>
            </Link>
          </li>
          <li className="mdl-menu__item">
            <Link to='/server-table'>
              <div>Tabela</div>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
})
