var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      hovering: false
    }
  },
  render: function () {
    var classes = "mdl-cell mdl-cell--2-col-desktop mdl-cell--4-col-tablet mdl-cell--12-col-phone app-card mdl-card mdl-shadow--2dp" + (this.state.hovering ? ' ativo' : '');

    return <div
        className={classes}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
      <a href="#">
        <div className={"status-" + this.props.status + " mdl-card__title"}>
            <h4 className="mdl-card__title-text">{this.props.cliente + " : " + this.props.nome}</h4>
        </div>
      </a>
      <div className="mdl-card__supporting-text">
        {this.detalhes()}
      </div>
      <div className="app-rodape mdl-card__actions mdl-card--border">
          Desde: {this.props.desde}
      </div>
      <div className="mdl-card__menu">
        <button
          className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
          onClick={this.handleAbreUrlClicked}>
          <i className="material-icons">open_in_new</i>
        </button>
      </div>
    </div>
  },
  handleAbreUrlClicked: function() {
    window.open(this.props.url,'_blank')
  },
  detalhes: function () {
    if(this.props.detalhesPop2) {
      return <ul className="detalhes-app">
        <li>Versão app: {this.props.detalhesPop2.versaoPopulis}</li>
        <li>Versão migração BD: {this.props.detalhesPop2.versaoMigracaoBancoDeDados}</li>
        <li>Servidor: {this.props.detalhesPop2.nomePcServidor}</li>
      </ul>;
    }
    return "";
  },
  icone: function () {
    if(this.props.status === 'up') {
      return "check";
    } else if(this.props.status === 'down') {
      return "warning";
    } else {
      return "";
    }
  },
  handleMouseEnter: function() {
    this.setState({
      hovering: true
    });
  },
  handleMouseLeave: function() {
    this.setState({
      hovering: false
    });
  }
});
