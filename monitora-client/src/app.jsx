var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');

// Componentes
var Botao = require('./components/botao');
var Header = require('./components/header');
var Grid = require('./components/grid');
var Menu = require('./components/menu');
var AplicativoForm = require('./components/aplicativo-form');
var AtualizacaoDisplay = require('./components/atualizacao-display');

// Url Firebase
var rootUrl = 'https://monitora.firebaseio.com/';

var eventosNovos = false;
var MAX_EVENTOS = 10;

var Main = React.createClass({
  mixins: [ReactFire],
  getInitialState: function () {
    return {
        aplicativos: [],
        eventos: [],
        mostraIncluir: false
    }
  },
  componentWillMount: function() {
    this.fbAplicativos = new Firebase(rootUrl + 'aplicativos/');
    this.bindAsArray(this.fbAplicativos, 'aplicativos');

    this.fbEventos = new Firebase(rootUrl + 'eventos/');
    this.fbEventos.on('child_added', this.handleEventoLoaded);
    // realiza uma pesquisa para separar os eventos pré-existentes dos novos
    this.fbEventos.limitToLast(1).once('value', this.setItensNovos);
  },
  render: function() {
    return  <div>
      <div className="mdl-layout mdl-js-layout">
        <Header eventos={this.state.eventos} aplicativos={this.state.aplicativos} handleFechaMensagens={this.handleFechaMensagens} />
        <main className="mdl-layout__content">
          {/*<AtualizacaoDisplay dataUltimaAtualizacao={this.state.dataUltimaAtualizacao}/>*/}
          <AplicativoForm aplicativosStore={this.firebaseRefs.aplicativos}/>
          <Grid aplicativos={this.state.aplicativos}/>
        </main>
        {/*<Menu />*/}
      </div>
      <div id="notificacao" className="mdl-js-snackbar mdl-snackbar">
        <div className="mdl-snackbar__text"></div>
        <button className="mdl-snackbar__action" type="button"></button>
      </div>
    </div>
  },
  setItensNovos: function(snap) {
    eventosNovos = true;
  },
  handleEventoLoaded: function (snap) {
    if(!eventosNovos) return;

    var notificacaoContainer = document.querySelector('#notificacao');
    var mensagem = snap.val().mensagem;

    notificacaoContainer.MaterialSnackbar.showSnackbar({
      message: mensagem
    });

    if(mensagem.indexOf('caiu') > -1) {
      new Audio('./sounds/error.mp3').play();
    } else if (mensagem.indexOf('subiu') > -1) {
      new Audio('./sounds/beep.mp3').play();
    }

    this.setState({
      dataUltimaAtualizacao: new Date()
    });

    var eventos = this.state.eventos;
    eventos.unshift(snap.val());

    if(eventos.length > MAX_EVENTOS) {
      eventos = _.initial(eventos);
    }

    this.setState({
        eventos: eventos
    });
  },
  handleFechaMensagens: function() {
    this.setState({
      eventos: []
    });
  }

});

var element = React.createElement(Main, {});
ReactDOM.render(element, document.querySelector('.container'));
