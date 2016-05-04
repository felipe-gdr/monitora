var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');
var moment = require('moment');

// Url Firebase
var rootUrl = 'https://monitora.firebaseio.com/';
var eventosPorAplicativoUrl = rootUrl + 'eventosPorAplicativo';

var Mensagem = require('./mensagem');
var PainelDetalhe = require('./painel-detalhe');

var OrganizaEventos = require('../servicos/organiza-eventos');

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function () {
    return {aplicativo: null, eventos: [], eventosOrganizados: []};
  },
  componentWillMount: function () {
    this.fbAplicativo = new Firebase(rootUrl + 'aplicativos/' + this.props.params.app);
    this.bindAsObject(this.fbAplicativo, 'aplicativo');

    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.params.app);

    var umaSemanaAtras = moment().subtract(7, 'day');

    eventosPorAplicativoRef.orderByChild('dataEvento').startAt(umaSemanaAtras.toDate().getTime()).once('value', function (snap) {
      var eventosOrganizados = new OrganizaEventos(_.values(snap.val())).getEventosOrganizados().reverse();
      var eventosDoAplicativo = _.values(snap.val()).reverse();

      console.log('eventosOrganizados', eventosOrganizados);

      this.setState({eventos: eventosDoAplicativo});
      this.setState({eventosOrganizados: eventosOrganizados});
    }.bind(this));
  },
  render: function () {
    if(!this.state.aplicativo) {
      return null;
    }

    return <div className="aplicativo-detalhe" >
      <h3 className="titulo-aplicativo">
        {this.state.aplicativo.cliente} {this.state.aplicativo.nome}
      </h3>

      <div className="paineis-detalhes">
        <PainelDetalhe
          rodape={this.renderDesdeStatus()}
          status={this.state.aplicativo.status}>
          {this.renderStatus()}
        </PainelDetalhe>

        <PainelDetalhe
          rodape="ocorreu em: 01/04/2016 08:30 (3 hours ago)">
          <div className="titulo">Última queda durou 1 hora e 23 minutos</div>
        </PainelDetalhe>

        <PainelDetalhe>
          <h5>Tempo no ar</h5>
          <div>
            <ul className="demo-list-icon mdl-list">
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">arrow_upward</i>
                  últimas 24 horas: 95,5%
                </span>
              </li>
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">arrow_upward</i>
                  últimos 7 dias: 97,2%
                </span>
              </li>
            </ul>
          </div>
        </PainelDetalhe>
      </div>

      <div className="lista-de-eventos mdl-shadow--2dp">
        <h5 className="titulo">Eventos nos últimos 7 dias</h5>
        <ul>
          {this.listaEventos()}
        </ul>
      </div>

    </div>
  },
  renderStatus: function () {
    var desde = '';
    if(this.state.eventosOrganizados.length == 0) {
      desde = 'mais de 7 dias atrás'
    } else {
      desde = "desde " + (moment(this.state.eventosOrganizados[0].dataEvento).fromNow());
    }

    return <div className="titulo">
      Status atual : {this.state.aplicativo.status}  ({desde})
    </div>
  },
  renderDesdeStatus: function () {
    if(this.state.eventosOrganizados.length == 0) {
      return 'mais de 7 dias atrás';
    } else {
      return "desde : " + moment(this.state.eventosOrganizados[0].dataEvento).format('DD/MM/YYYY HH:mm');
    }

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
