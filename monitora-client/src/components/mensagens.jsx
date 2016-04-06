var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      mostraLista: false
    }
  },
  render: function () {
    return <div className="mensagens">
      <a className="mdl-navigation__link"
        onClick={this.handleClick}
        href="javascript:void(0)">
        <div
          className="material-icons mdl-badge mdl-badge--overlap"
          data-badge="5">
          message
        </div>
      </a>
      {this.state.mostraLista ? this.lista() : null}
    </div>
  },
  lista: function() {
    return <div className="mdl-shadow--2dp lista-mensagens">
      <ul>
        <li className="nao-lida">
          <span className="mensagem subiu">
            <i className="material-icons">arrow_upward</i>
            Advanta : Populis I subiu
          </span>
          <div className="horario">há 1 horas...</div>
        </li>
        <li>
          <span className="mensagem caiu">
            <i className="material-icons">arrow_downward</i>
            Advanta : Populis I caiu
          </span>
          <div className="horario">há 1 horas...</div>
        </li>
        <li>
          <span className="mensagem subiu">
            <i className="material-icons">arrow_upward</i>
            Advanta : Populis I subiu
          </span>
          <div className="horario">há 2 horas...</div>
        </li>
      </ul>
      <span className="rodape">Atualizado em 26/03/2016 18:14</span>
    </div>
  },
  handleClick: function () {
    this.setState({
      mostraLista: !this.state.mostraLista
    })
  }
});
