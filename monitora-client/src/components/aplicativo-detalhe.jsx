var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

// Url Firebase
var rootUrl = 'https://monitora.firebaseio.com/';

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function () {
    return {aplicativo: null};
  },
  componentWillMount: function () {
    this.fbAplicativo = new Firebase(rootUrl + 'aplicativos/' + this.props.params.app);
    this.bindAsObject(this.fbAplicativo, 'aplicativo');
  },
  render: function () {
    if(!this.state.aplicativo) {
      return null;
    }

    return <div >
      Detalhe: {this.state.aplicativo.cliente} : {this.state.aplicativo.nome}
      <br />
      Status: {this.state.aplicativo.status}
    </div>
  }
});
