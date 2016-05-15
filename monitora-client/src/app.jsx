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
var Grid = require('./components/grid');
var Menu = require('./components/menu');
var AplicativoForm = require('./components/aplicativo-form');
var AtualizacaoDisplay = require('./components/atualizacao-display');
var Notificacao = require('./components/notificacao');
var AplicativoDetalhe = require('./components/aplicativo-detalhe');

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
        <Header eventos={this.state.eventos} aplicativos={this.state.aplicativos} handleFechaMensagens={this.handleFechaMensagens} />
        <main className="mdl-layout__content">
          {/*<AtualizacaoDisplay dataUltimaAtualizacao={this.state.dataUltimaAtualizacao}/>*/}
          <AplicativoForm aplicativosStore={this.firebaseRefs.aplicativos}/>
          {children}
        </main>
        {/*<Menu />*/}
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
      <Route path="grid" component={Grid} />
      <Route path="app/:app" component={AplicativoDetalhe} />
      <IndexRedirect to="grid" />
    </Route>
  </Router>
);

//var element = React.createElement(Main, {});
ReactDOM.render(routes, document.querySelector('.container'));
