var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');
var moment = require('moment');

// Url Firebase
var ROOT_URL = require('../constantes').ROOT_URL;
var eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

var PainelDetalhe = require('./paineis-detalhes/painel-detalhe');
var ListaEventos = require('./paineis-detalhes/lista-eventos');
var StatusAtual = require('./paineis-detalhes/status-atual');
var UltimaQueda = require('./paineis-detalhes/ultima-queda');
var TempoNoAr = require('./paineis-detalhes/tempo-no-ar');

var OrganizaEventos = require('../servicos/organiza-eventos');

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function () {
    return {aplicativo: null, eventos: [], eventosOrganizados: []};
  },
  componentWillMount: function () {
    this.fbAplicativo = new Firebase(ROOT_URL + 'aplicativos/' + this.props.params.app);
    this.bindAsObject(this.fbAplicativo, 'aplicativo');

    /*
    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.params.app);

    var umaSemanaAtras = moment().subtract(7, 'day');

    eventosPorAplicativoRef.orderByChild('dataEvento').startAt(umaSemanaAtras.toDate().getTime()).once('value', function (snap) {
      var eventosOrganizados = new OrganizaEventos(_.values(snap.val())).getEventosOrganizados().reverse();

      this.setState({
        eventosOrganizados: eventosOrganizados
      });

    }.bind(this));
    */
  },
  render: function () {
    if(!this.state.aplicativo) {
      return null;
    }

    return <div className="aplicativo-estatisticas" >
      <h3 className="titulo-aplicativo">
        {this.state.aplicativo.cliente} {this.state.aplicativo.nome}
      </h3>

      <div className="paineis-detalhes">
        <StatusAtual aplicativo={this.state.aplicativo} />

        <UltimaQueda app={this.props.params.app} />

        <TempoNoAr app={this.props.params.app} />
      </div>

      <ListaEventos app={this.props.params.app} />
    </div>
  }
});
