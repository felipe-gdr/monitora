import React from 'react';
import ReactFire from 'reactfire';
import Firebase from 'firebase';
import _ from 'lodash';

// Componentes
import Favicon from './components/favicon';

import Header from './components/header';
import AppForm from './components/app-form';
import Notificacao from './components/notificacao';

// Url Firebase
import { ROOT_URL } from './constantes';

// package.json
import { version } from '../package.json';

let eventosNovos = false;

export default React.createClass({
    mixins: [ReactFire],
    getInitialState() {
        return {
            aplicativos: [],
            eventos: [],
            mostraIncluir: false,
        };
    },
    componentWillMount() {
        this.fbAplicativos = new Firebase(ROOT_URL + 'aplicativos/');
        this.bindAsArray(this.fbAplicativos, 'aplicativos');

        this.fbEventos = new Firebase(ROOT_URL + 'eventosRecentes/');
        this.fbEventos.limitToLast(10).on('child_added', this.handleEventoLoaded);

        // realiza uma pesquisa para separar os eventos pré-existentes dos novos
        this.fbEventos.limitToLast(1).once('value', this.setItensNovos);
    },
    render() {
        const children = React.cloneElement(this.props.children, {aplicativos: this.state.aplicativos});

        return <div>
            <Favicon aplicativos={this.state.aplicativos}/>
            <div className='mdl-layout mdl-js-layout'>
                <Header
                    eventos={this.state.eventos}
                    aplicativos={this.state.aplicativos}
                    handleFechaMensagens={this.handleFechaMensagens}/>
                <main className='mdl-layout__content'>
                    {/*<AtualizacaoDisplay dataUltimaAtualizacao={this.state.dataUltimaAtualizacao}/>*/}
                    <AppForm aplicativosStore={this.firebaseRefs.aplicativos}/>
                    {children}
                </main>
                <footer className='footer'>v. {version} </footer>
            </div>
            <Notificacao ref='notificacao'/>
        </div>;
    },
    setItensNovos () {
        eventosNovos = true;
    },
    handleEventoLoaded (snap) {
        if (!eventosNovos) return;

        this.refs.notificacao.showMessage(snap.val().mensagem);

        this.setState({
            dataUltimaAtualizacao: new Date(),
        });

        let eventos = this.state.eventos;

        eventos.unshift(snap.val());

        if (eventos.length > 10) {
            eventos = _.initial(eventos);
        }

        this.setState({
            eventos: eventos,
        });
    },
    handleFechaMensagens() {
        this.setState({
            eventos: [],
        });
    },
});
