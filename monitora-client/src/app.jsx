var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

// Componentes
var Botao = require('./components/botao');
var Header = require('./components/header');
var Grid = require('./components/grid');
var Menu = require('./components/menu');
var AplicativoForm = require('./components/aplicativo-form');
var AtualizacaoDisplay = require('./components/atualizacao-display');

// Url Firebase
var rootUrl = 'https://monitora.firebaseio.com/';

var Main = React.createClass({
  mixins: [ReactFire],
  getInitialState: function () {
    return {
        aplicativos: [],
        mostraIncluir: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'aplicativos/');
    this.bindAsObject(this.fb, 'aplicativos');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return  <div>
      <div className="mdl-layout mdl-js-layout">
        <Header />
        <main className="mdl-layout__content">
          <AtualizacaoDisplay dataUltimaAtualizacao={this.state.dataUltimaAtualizacao}/>
          <AplicativoForm aplicativosStore={this.firebaseRefs.aplicativos}/>
          <Grid aplicativos={this.state.aplicativos}/>
        </main>
        <Menu />
      </div>
    </div>
  },
  handleDataLoaded: function () {
    console.log('atualizando dados do firebase');
    this.setState({
      dataUltimaAtualizacao: new Date()
    });
  }
});

var element = React.createElement(Main, {});
ReactDOM.render(element, document.querySelector('.container'));
