var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');

// Componentes
var Favicon = require('./components/favicon');
var Header = require('./components/header');

var AppForm = require('./components/app-form');
var Notificacao = require('./components/notificacao');

// Url Firebase
var ROOT_URL = require('./constantes').ROOT_URL;

// package.json
var version = require('../package.json').version

var eventosNovos = false;

module.exports = React.createClass({
    mixins: [ReactFire],
    getInitialState: function () {
        return {
            aplicativos: [],
            eventos: [],
            mostraIncluir: false
        }
    },
    componentWillMount: function () {
        this.fbAplicativos = new Firebase(ROOT_URL + 'aplicativos/');
        this.bindAsArray(this.fbAplicativos, 'aplicativos');

        this.fbEventos = new Firebase(ROOT_URL + 'eventosRecentes/');
        this.fbEventos.limitToLast(10).on('child_added', this.handleEventoLoaded);
        // realiza uma pesquisa para separar os eventos pré-existentes dos novos
        this.fbEventos.limitToLast(1).once('value', this.setItensNovos);
    },
    render: function () {
        var children = React.cloneElement(this.props.children, {aplicativos: this.state.aplicativos});

        return <div>
            <Favicon aplicativos={this.state.aplicativos}/>
            <div className="mdl-layout mdl-js-layout">
                <Header
                    eventos={this.state.eventos}
                    aplicativos={this.state.aplicativos}
                    handleFechaMensagens={this.handleFechaMensagens}/>
                <main className="mdl-layout__content">
                    {/*<AtualizacaoDisplay dataUltimaAtualizacao={this.state.dataUltimaAtualizacao}/>*/}
                    <AppForm aplicativosStore={this.firebaseRefs.aplicativos}/>
                    {children}
                </main>
                <footer className="footer">v. {version} </footer>
            </div>
            <Notificacao ref="notificacao"/>
        </div>
    },
    setItensNovos: function (snap) {
        eventosNovos = true;
    },
    handleEventoLoaded: function (snap) {
        if (!eventosNovos) return;

        this.refs.notificacao.showMessage(snap.val().mensagem);

        this.setState({
            dataUltimaAtualizacao: new Date()
        });

        var eventos = this.state.eventos;
        eventos.unshift(snap.val());

        if (eventos.length > 10) {
            eventos = _.initial(eventos);
        }

        this.setState({
            eventos: eventos
        });
    },
    handleFechaMensagens: function () {
        this.setState({
            eventos: []
        });
    }

});
