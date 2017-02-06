var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');
var moment = require('moment');

var DetalhesPop1 = require('./aplicativo-detalhe-pop1')

// Url Firebase
var ROOT_URL = require('../constantes').ROOT_URL;

module.exports = React.createClass({
    mixins: [ReactFire],

    getInitialState: function() {
        return {aplicativo: null};
    },

    componentWillMount: function() {
        this.fbAplicativo = new Firebase(ROOT_URL + 'aplicativos/' + this.props.params.app);
        this.bindAsObject(this.fbAplicativo, 'aplicativo');
    },
    render: function() {
      var aplicativo = this.state.aplicativo

      if (!aplicativo) {
          return null;
      }

      return <div className="aplicativo-detalhe">
          <h3 className="titulo-aplicativo">
              {aplicativo.cliente} - {aplicativo.nome}
          </h3>
          <h6 className="url">
            <a href={aplicativo.url} target="_blank">{aplicativo.url}</a>
          </h6>
          <DetalhesPop1 aplicativo={aplicativo} />
      </div>
    }
});
