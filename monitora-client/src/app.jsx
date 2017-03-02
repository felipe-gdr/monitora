var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRedirect = ReactRouter.IndexRedirect;
var hashHistory = ReactRouter.hashHistory;

// Componentes
var Botao = require('./components/botao');
var Header = require('./components/header');
var AppGrid = require('./components/app-grid');
var ServerGrid = require('./components/server-grid');
var ServerTable = require('./components/server-table');
var AppForm = require('./components/app-form');
var AtualizacaoDisplay = require('./components/atualizacao-display');
var Notificacao = require('./components/notificacao');
var AppDetalhe = require('./components/app-detalhe');

// Url Firebase
var ROOT_URL = require('./constantes').ROOT_URL;

var eventosNovos = false;

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
    this.fbAplicativos = new Firebase(ROOT_URL + 'aplicativos/');
    this.bindAsArray(this.fbAplicativos, 'aplicativos');

    this.fbEventos = new Firebase(ROOT_URL + 'eventosRecentes/');
    this.fbEventos.limitToLast(10).on('child_added', this.handleEventoLoaded);
    // realiza uma pesquisa para separar os eventos pré-existentes dos novos
    this.fbEventos.limitToLast(1).once('value', this.setItensNovos);
  },
  render: function() {
    var children = React.cloneElement(this.props.children, {aplicativos: this.state.aplicativos});

    return  <div>
      <div className="mdl-layout mdl-js-layout">
        <Header
          eventos={this.state.eventos}
          aplicativos={this.state.aplicativos}
          handleFechaMensagens={this.handleFechaMensagens} />
        <main className="mdl-layout__content">
          {/*<AtualizacaoDisplay dataUltimaAtualizacao={this.state.dataUltimaAtualizacao}/>*/}
          <AppForm aplicativosStore={this.firebaseRefs.aplicativos}/>
          {children}
        </main>
      </div>
      <Notificacao ref="notificacao"/>
    </div>
  },
  setItensNovos: function(snap) {
    eventosNovos = true;
  },
  handleEventoLoaded: function (snap) {
    if(!eventosNovos) return;

    this.refs.notificacao.showMessage(snap.val().mensagem);

    this.setState({
      dataUltimaAtualizacao: new Date()
    });

    var eventos = this.state.eventos;
    eventos.unshift(snap.val());

    if(eventos.length > 10) {
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

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="app" component={AppGrid} />
      <Route path="app/:app" component={AppDetalhe} />
      <Route path="server" component={ServerGrid} />
      <Route path="server-table" component={ServerTable} />
      <IndexRedirect to="app" />
    </Route>
  </Router>
);

//var element = React.createElement(Main, {});
ReactDOM.render(routes, document.querySelector('.container'));
