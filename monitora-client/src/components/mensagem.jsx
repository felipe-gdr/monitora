var React = require('react');

module.exports = React.createClass({
  render: function() {
    return  <li className="nao-lida">
      <span className={"mensagem " + this.classe()}>
        <i className="material-icons">{this.icone()}</i>
        {this.props.mensagem}
      </span>
      <div className="horario">{this.props.dataEvento}</div>
    </li>
  },
  icone: function() {
    return this.props.mensagem.indexOf('subiu') > -1 ? 'arrow_upward' : 'arrow_downward';
  },
  classe: function() {
    return this.props.mensagem.indexOf('subiu') > -1 ? 'subiu' : 'caiu';
  }

});
