var React = require('react');
var Firebase = require('firebase');
var moment = require('moment');

var Mensagem = require('../mensagem');

// Url Firebase
var ROOT_URL = require('../../constantes').ROOT_URL;
var eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      eventos: []
    };
  },
  componentWillMount: function() {
    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.app);

    var umDiaAtras = moment().subtract(1, 'day');

    eventosPorAplicativoRef.orderByChild('dataEvento').startAt(umDiaAtras.toDate().getTime()).on('value', function (snap) {
      var eventosDoAplicativo = _.values(snap.val()).reverse();

      this.setState({
        eventos: eventosDoAplicativo
      });

    }.bind(this));

  },
  render: function() {
    return (
      <div className="lista-de-eventos mdl-shadow--2dp">
        <h5 className="titulo">Eventos nas últimas 24 horas</h5>
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
