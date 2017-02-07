var React = require('react');

var OrganizaServidores = require('../servicos/organiza-servidores');

module.exports = React.createClass({
  render: function() {
    var apps = new OrganizaServidores(this.props.aplicativos).getListaAplicativos();
    if(!apps) {
      return null;
    }

    return (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">IP</th>
            <th className="mdl-data-table__cell--non-numeric">Tipo</th>
            <th className="mdl-data-table__cell--non-numeric">Cliente</th>
            <th className="mdl-data-table__cell--non-numeric">Aplicativo</th>
            <th className="mdl-data-table__cell--non-numeric">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            apps.map((app) => this.renderAplicativo(app))
          }
        </tbody>
      </table>
    )
  },

  renderAplicativo: function(app) {
    return (
      <tr key={app.cliente + app.nomeApp}>
        <td className="mdl-data-table__cell--non-numeric">{app.ip}</td>
        <td className="mdl-data-table__cell--non-numeric">{app.tipo}</td>
        <td className="mdl-data-table__cell--non-numeric">{app.cliente}</td>
        <td className="mdl-data-table__cell--non-numeric">
          {
            app.url &&
            <a href={app.url} target="_blank">{app.nomeApp}</a>
          }
          { !app.url && app.nomeApp }
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          <div
            title={app.status}
            className={'status ' + app.status}></div>
        </td>
      </tr>
    )
  }

});
