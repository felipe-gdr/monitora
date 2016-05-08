var React = require('react');
var _ = require('lodash');

var Link = require('react-router').Link;

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
      <Link to={'app/' + this.props.cliente + "_" + this.props.nome}>
        <div className={"status-" + this.props.status + " mdl-card__title"}>
            <h4 className="mdl-card__title-text">{this.props.cliente + " : " + this.props.nome}</h4>
        </div>
      </Link>
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
        {this.cluster()}
      </div>
    </div>
  },
  handleAbreUrlClicked: function() {
    window.open(this.props.url,'_blank')
  },
  detalhes: function () {
    if(this.props.detalhesServidor) {
      return <ul className="detalhes-app">
        <li>Versão app: {this.props.detalhesServidor.versaoPopulis}</li>
        <li>Servidor: {this.props.detalhesServidor.nomePcServidor}</li>
        <li>IP: {this.props.detalhesServidor.ipServidor}</li>
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
  cluster: function () {
    if(this.props.cluster) {
      var nodes = _.values(this.props.cluster).map(function (node) {
        return <div className={"node status-" + node.status} title={node.nomeNode + ' - ' + node.status}/>
      });

      return <div className="nodes">
        {nodes}
      </div>
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
