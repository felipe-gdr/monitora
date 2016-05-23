var React = require('react');
var Firebase = require('firebase');
var moment = require('moment');

var Mensagem = require('../mensagem');

// Url Firebase
var ROOT_URL = require('../../constantes').ROOT_URL;
var eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

var QTDE_DIAS_BUSCA = 7;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      eventos: []
    };
  },
  componentWillMount: function() {
    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.app);

    var periodoBusca = moment().subtract(QTDE_DIAS_BUSCA, 'day').toDate().getTime();

    eventosPorAplicativoRef.orderByChild('dataEvento').startAt(periodoBusca).on('value', function (snap) {
      var eventosDoAplicativo = _.values(snap.val()).reverse();

      this.setState({
        eventos: eventosDoAplicativo
      });

    }.bind(this));

  },
  render: function() {
    return (
      <div className="lista-de-eventos mdl-shadow--2dp">
        <h5 className="titulo">Eventos nos últimos {QTDE_DIAS_BUSCA} dias</h5>
        <ul>
          {this.listaEventos()}
        </ul>
      </div>
    );
  },
  listaEventos: function () {
    if(this.state.eventos.length == 0) {
      return <div>Nenhuma novidade </div>
    }

    return this.state.eventos.map(function (evento){
      return <Mensagem {...evento} key={evento.dataEvento}/>
    });
  }
});
