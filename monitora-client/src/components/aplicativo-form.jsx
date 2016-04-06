var React = require('react');
var _ = require('lodash');

var TextField = require('./text-field');
var Botao = require('./botao');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      mostra: false,
      aplicativoInclusao: {
        nome: '',
        cliente: '',
        url: ''
      }
    };
  },
  render: function () {
    return <div className="aplicativo-form">
      <div className={"formulario" + (this.state.mostra ? '' : ' esconde')}>
        <TextField nome="Nome" onTextChanged={this.handleNomeChanged} />
        <TextField nome="Cliente" onTextChanged={this.handleClienteChanged} />
        <br />
        <TextField nome="Url" onTextChanged={this.handleUrlChanged} />
        <div className="acoes">
          <Botao
            icone="done"
            onClick={this.handleClickSalvar}
            title="Salvar"
            cor="colored"/>
          <Botao
            icone="clear"
            title="Fechar"
            onClick={this.handleClickEscondeIncluir}/>
        </div>
      </div>
      <div className="acao-incluir">
        <Botao
          icone="add"
          title="Incluir"
          cor="accent"
          tipo="fab"
          onClick={this.handleClickToggleIncluir}/>
      </div>
    </div>
  },
  renderFormulario: function() {
    if(!this.state.mostra) {
      return null;
    }

    return <div className="formulario">
      <TextField nome="Nome" onTextChanged={this.handleNomeChanged} />
      <TextField nome="Cliente" onTextChanged={this.handleClienteChanged} />
      <TextField nome="Url" onTextChanged={this.handleUrlChanged} />
      <div className="acoes">
        <Botao
          icone="done"
          onClick={this.handleClickSalvar}
          title="Salvar"
          cor="colored"/>
        <Botao
          icone="clear"
          title="Fechar"
          onClick={this.handleClickEscondeIncluir}/>
      </div>
    </div>
  },
  handleNomeChanged: function(texto) {
    this.setState(_.merge(this.state, {
      aplicativoInclusao: {
        nome: texto
      }
    }));
  },
  handleClienteChanged: function(texto) {
    this.setState(_.merge(this.state, {
      aplicativoInclusao: {
        cliente: texto
      }
    }));
  },
  handleUrlChanged: function(texto) {
    this.setState(_.merge(this.state, {
      aplicativoInclusao: {
        url: texto
      }
    }));
  },
  handleClickSalvar: function () {
    this.props.aplicativosStore.push(this.state.aplicativoInclusao);
  },
  handleClickToggleIncluir: function() {
    this.setState({
      mostra: !this.state.mostra
    });
  },
  handleClickEscondeIncluir: function() {
    this.setState({
      mostra: false
    });
  }
});
