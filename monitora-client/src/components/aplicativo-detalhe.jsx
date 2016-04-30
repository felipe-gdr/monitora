var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');

// Url Firebase
var rootUrl = 'https://monitora.firebaseio.com/';
var eventosPorAplicativoUrl = rootUrl + 'eventosPorAplicativo';

var Mensagem = require('./mensagem');

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function () {
    return {aplicativo: null, eventos: []};
  },
  componentWillMount: function () {
    this.fbAplicativo = new Firebase(rootUrl + 'aplicativos/' + this.props.params.app);
    this.bindAsObject(this.fbAplicativo, 'aplicativo');

    var eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.params.app);

    eventosPorAplicativoRef.limitToLast(50).once('value', function (snap) {
      var eventosDoAplicativo = _.values(snap.val());
      this.setState({eventos: eventosDoAplicativo});
    }.bind(this));
  },
  render: function () {
    if(!this.state.aplicativo) {
      return null;
    }

    return <div className="aplicativo-detalhe" >
      <h3>
        {this.state.aplicativo.cliente} : {this.state.aplicativo.nome}
        <img className="img-status" src={this.imgStatus()} title={this.state.aplicativo.status} />
      </h3>
      {this.listaEventos()}
    </div>
  },
  imgStatus: function () {
      return 'imagens/' + (this.state.aplicativo.status == 'up' ? 'monitora-ok.png' : 'monitora-down.png');
  },
  listaEventos: function () {
    var count = 0;

    var eventos = this.state.eventos.map(function (evento){
      return <span>
        {count}
        <Mensagem {...evento} key={count++}/>
      </span>
    });

    return <ul>
      {eventos}
    </ul>
  }

});
