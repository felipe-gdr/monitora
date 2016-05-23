var React = require('react');
var Firebase = require('Firebase');
var moment = require('moment');
var _ = require('lodash');

var Loading = require('../loading');
var PainelDetalhe = require('./painel-detalhe');

var ROOT_URL = require('../../constantes').ROOT_URL;
var eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      duracaoUltimaQueda: 0,
      dataUltimaQueda: null,
      loading: true
    }
  },
  componentWillMount: function() {
    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.app);

    var umaSemanaAtras = moment().subtract(7, 'day');

    eventosPorAplicativoRef.orderByChild('dataEvento').startAt(umaSemanaAtras.toDate().getTime()).on('value', function (snap) {
      var eventosDoAplicativo = _.values(snap.val()).reverse();

      var duracaoUltimaQueda = null;

      _.each(eventosDoAplicativo, function(evento, i) {
        if(evento.mensagem.indexOf('caiu') > 0) {
          var dataSubida = i > 0 ? moment(eventosDoAplicativo[i-1].dataEvento) : moment();
          var dataQueda = moment(evento.dataEvento);

          this.setState({
            duracaoUltimaQueda: dataSubida.diff(dataQueda, 'minutes'),
            dataUltimaQueda: dataQueda
          });

          return false;
        }
      }.bind(this));

      this.setState({loading: false});

    }.bind(this));

  },
  render: function() {
    if(this.state.loading) {
      return (
        <PainelDetalhe>
          <Loading />
        </PainelDetalhe>
      );
    }

    var dataUltimaQueda = this.state.dataUltimaQueda;
    if(!dataUltimaQueda) {
      return (
        <PainelDetalhe>
          <div className="titulo">Nenhuma queda nos últimos 7 dias</div>
        </PainelDetalhe>
      );
    }

    return (
      <PainelDetalhe
        rodape={"ocorreu em: " + dataUltimaQueda.format('DD/MM/YYYY HH:mm')}>
        <div className="titulo">Última queda foi a {dataUltimaQueda.fromNow()} durou {this.state.duracaoUltimaQueda} minutos</div>
      </PainelDetalhe>
    );
  }
})
