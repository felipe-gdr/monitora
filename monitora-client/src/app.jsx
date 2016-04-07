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
  handleDataLoaded: function (snap) {
    var temErro = false;

    _.forIn(snap.val(), function(aplicativo) {
      if(aplicativo.status == 'down') {
        temErro = true;
        return false;
      }
    });

    if(temErro) {
      new Audio('./sounds/error.mp3').play();
    } else {
      new Audio('./sounds/beep.mp3').play();
    }

    this.setState({
      dataUltimaAtualizacao: new Date()
    });
  }
});

var element = React.createElement(Main, {});
ReactDOM.render(element, document.querySelector('.container'));
