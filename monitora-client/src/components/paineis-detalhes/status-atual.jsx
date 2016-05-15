var React = require('react');
var moment = require('moment');

var Loading = require('../loading');
var PainelDetalhe = require('./painel-detalhe');

var ROOT_URL = require('../../constantes').ROOT_URL;
var eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      eventoMaisRecente: null
    };
  },
  componentWillMount: function () {
    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.aplicativo.key);

    eventosPorAplicativoRef.orderByChild('dataEvento').limitToLast(1).on('child_added', function (snap) {
      this.setState({
        eventoMaisRecente: snap.val()
      });

    }.bind(this));
  },
  render: function() {
    return (
      <PainelDetalhe
        rodape={this.renderDesdeStatus()}
        status={this.props.aplicativo.status}>
        {this.renderStatus()}
      </PainelDetalhe>
    )
  },
  renderStatus: function () {
    if(!this.state.eventoMaisRecente) {
      return <Loading />;
    }

    var desde = "desde " + (moment(this.state.eventoMaisRecente.dataEvento).fromNow());

    return <div className="titulo">
      Status atual : {this.props.aplicativo.status}  ({desde})
    </div>
  },
  renderDesdeStatus: function () {
    if(this.state.eventoMaisRecente) {
      return "desde : " + moment(this.state.eventoMaisRecente.dataEvento).format('DD/MM/YYYY HH:mm');
    }
  }
})
