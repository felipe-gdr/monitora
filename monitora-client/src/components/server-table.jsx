var React = require('react');
var _ = require('lodash');

var OrganizaServidores = require('../servicos/organiza-servidores');

module.exports = React.createClass({
  getInitialState: function() {
    return {appsFiltrados: []}
  },

  componentDidMount() {
    const apps = new OrganizaServidores(this.props.aplicativos).getListaAplicativos()

    this.setState({ appsFiltrados: apps, appsTodos: apps })
  },

  componentWillReceiveProps() {
    const apps = new OrganizaServidores(this.props.aplicativos).getListaAplicativos()

    this.setState({ appsFiltrados: apps, appsTodos: apps })
  },

  applyFilters() {
    const ip      = document.querySelector('#ip').value,
          tipo    = document.querySelector('#tipo').value,
          cliente = document.querySelector('#cliente').value,
          versao  = document.querySelector('#versao').value,
          status  = document.querySelector('#status').value

    let appsFiltrados = this.state.appsTodos

    if(ip) {
      appsFiltrados = _.filter(appsFiltrados, {'ip': ip})
    }

    if(tipo) {
      appsFiltrados = _.filter(appsFiltrados, {'tipo': tipo})
    }

    if(cliente) {
      appsFiltrados = _.filter(appsFiltrados, {'cliente': cliente})
    }

    if(versao) {
      appsFiltrados = _.filter(appsFiltrados, {'versao': versao})
    }

    if(status) {
      appsFiltrados = _.filter(appsFiltrados, {'status': status})
    }

    this.setState({ appsFiltrados })
  },

  render: function() {
    var { appsFiltrados, appsTodos } = this.state

    if(!appsTodos) {
      return null;
    }

    const ips = _(appsTodos).map('ip').uniq().sortBy().value(),
          tipos = _(appsTodos).map('tipo').uniq().sortBy().value(),
          clientes = _(appsTodos).map('cliente').sortBy().uniq().value(),
          versoes = _(appsTodos).map('versao').sortBy().uniq().value(),
          statuses = _(appsTodos).map('status').sortBy().uniq().value()

    return (
      <div className="server-table">
        <div className="filters">
          <div className="field">
            <label htmlFor="ip">IP: </label>
            <select id="ip" onChange={this.applyFilters}>
              <option value="">selecionar...</option>
              {ips.map((ip)=> (<option key={ip} value={ip}>{ip}</option>) )}
            </select>
          </div>

          <div className="field">
            <label htmlFor="tipo">Tipo: </label>
            <select id="tipo" onChange={this.applyFilters}>
              <option value="">selecionar...</option>
              {tipos.map((tipo)=> (<option key={tipo} value={tipo}>{tipo}</option>) )}
            </select>
          </div>

          <div className="field">
            <label htmlFor="cliente">Cliente: </label>
            <select id="cliente" onChange={this.applyFilters}>
              <option value="">selecionar...</option>
              {clientes.map((cliente)=> (<option key={cliente} value={cliente}>{cliente}</option>) )}
            </select>
          </div>

          <div className="field">
            <label htmlFor="versao">Versao: </label>
            <select id="versao" onChange={this.applyFilters}>
              <option value="">selecionar...</option>
              {versoes.map((versao)=> (<option key={versao} value={versao}>{versao}</option>) )}
            </select>
          </div>

          <div className="field">
            <label htmlFor="status">Status: </label>
            <select id="status" onChange={this.applyFilters}>
              <option value="">selecionar...</option>
              {statuses.map((status)=> (<option key={status} value={status}>{status}</option>) )}
            </select>
          </div>

        </div>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">Servidor</th>
              <th className="mdl-data-table__cell--non-numeric">Tipo</th>
              <th className="mdl-data-table__cell--non-numeric">Cliente</th>
              <th className="mdl-data-table__cell--non-numeric">Aplicativo</th>
              <th className="mdl-data-table__cell--non-numeric">Versao</th>
              <th className="mdl-data-table__cell--non-numeric">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              appsFiltrados.map((app) => this.renderAplicativo(app))
            }
          </tbody>
        </table>
      </div>
    )
  },

  renderAplicativo: function(app) {
    var servidor = app.nomeServidor ? `${app.ip} (${app.nomeServidor})` : app.ip

    return (
      <tr key={app.cliente + app.nomeApp}>
        <td className="mdl-data-table__cell--non-numeric">{servidor}</td>
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
          {app.versao}
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
