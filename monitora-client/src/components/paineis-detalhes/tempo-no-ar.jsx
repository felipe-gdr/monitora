var React = require('react');
var moment = require('moment');
var _ = require('lodash');
var Firebase = require('firebase');

var PainelDetalhe = require('./painel-detalhe');
var OrganizaEventos = require('../../servicos/organiza-eventos');
var Loading = require('../loading');

var ROOT_URL = require('../../constantes').ROOT_URL;
var eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

var QTDE_DIAS_BUSCA = 7;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      porcentagemUp: 0,
      porcentagemInstavel: 0,
      porcentagemDown: 0,
      loading: true
    }
  },
  componentWillMount: function() {
    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.app);
    var periodoBusca = moment().subtract(QTDE_DIAS_BUSCA, 'day').toDate().getTime();

    eventosPorAplicativoRef.orderByChild('dataEvento').startAt(periodoBusca).on('value', function (snap) {
      var eventosDoAplicativo = _.values(snap.val());

      var eventosOrganizados = new OrganizaEventos(eventosDoAplicativo).getEventosOrganizados();

      var tempos = {
        subiu: 0,
        instavel: 0,
        caiu: 0,
        total: 0
      }

      eventosOrganizados.forEach(function(evento) {
          if(!evento.duracao) {
            evento.duracao = moment().diff(moment(evento.dataEvento));
          }

          var duracao = (evento.duracao / 1000);

          tempos[evento.evento] += duracao;
          tempos.total += duracao;
      });

      this.setState({
        porcentagemUp: tempos.subiu / tempos.total,
        porcentagemDown: tempos.caiu / tempos.total,
        porcentagemInstavel: tempos['instável'] / tempos.total,
        loading: false
      });
    }.bind(this));
  },
  render: function() {
    if(this.state.loading) {
        return ( <PainelDetalhe><Loading /></PainelDetalhe>);
    }

    return (
      <PainelDetalhe>
        <h5>Últimos {QTDE_DIAS_BUSCA} dias</h5>
        <div className="tempo-no-ar">
          <ul className="demo-list-icon mdl-list">
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">
                <i className="material-icons mdl-list__item-icon status-up">arrow_upward</i>
                Up: {(this.state.porcentagemUp * 100).toFixed(2)}%
              </span>
            </li>
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">
                <i className="material-icons mdl-list__item-icon status-unstable">arrow_downward</i>
                Instável: {(this.state.porcentagemInstavel * 100).toFixed(2)}%
              </span>
            </li>
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">
                <i className="material-icons mdl-list__item-icon status-down">arrow_downward</i>
                Down: {(this.state.porcentagemDown * 100).toFixed(2)}%
              </span>
            </li>
          </ul>
        </div>
      </PainelDetalhe>
    );
  }
})
