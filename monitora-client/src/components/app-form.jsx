import React from 'react';
import _ from 'lodash';
import TextField from './text-field';
import Botao from './botao';

export default React.createClass({
    getInitialState() {
        return {
            mostra: false,
            aplicativoInclusao: {
                nome: '',
                cliente: '',
                url: '',
            },
        };
    },
    render() {
        return <div className='aplicativo-form'>
            <div className={'formulario' + (this.state.mostra ? '' : ' esconde')}>
                <TextField nome='Nome x' onTextChanged={this.handleNomeChanged}/>
                <TextField nome='Cliente x' onTextChanged={this.handleClienteChanged}/>
                <br/>

                <div className='acoes'>
                    <Botao
                        icone='done'
                        onClick={this.handleClickSalvar}
                        title='Salvar'
                        cor='colored'/>
                    <Botao
                        icone='clear'
                        title='Fechar'
                        onClick={this.handleClickEscondeIncluir}/>
                </div>
            </div>
            <div className='acao-incluir'>
                <Botao
                    icone='add'
                    title='Incluir'
                    cor='accent'
                    tipo='fab'
                    onClick={this.handleClickToggleIncluir}/>
            </div>
        </div>;
    },
    renderFormulario() {
        if (!this.state.mostra) {
            return null;
        }

        return <div className='formulario'>
            <TextField nome='Nome' onTextChanged={this.handleNomeChanged}/>
            <TextField nome='Cliente' onTextChanged={this.handleClienteChanged}/>
            <TextField nome='Url' onTextChanged={this.handleUrlChanged}/>
            <div className='acoes'>
                <Botao
                    icone='done'
                    onClick={this.handleClickSalvar}
                    title='Salvar'
                    cor='colored'/>
                <Botao
                    icone='clear'
                    title='Fechar'
                    onClick={this.handleClickEscondeIncluir}/>
            </div>
        </div>;
    },
    handleNomeChanged (texto) {
        this.setState(_.merge(this.state, {
            aplicativoInclusao: {
                nome: texto,
            },
        }));
    },
    handleClienteChanged (texto) {
        this.setState(_.merge(this.state, {
            aplicativoInclusao: {
                cliente: texto,
            },
        }));
    },
    handleUrlChanged (texto) {
        this.setState(_.merge(this.state, {
            aplicativoInclusao: {
                url: texto,
            },
        }));
    },
    handleClickSalvar() {
        this.props.aplicativosStore.child(this.state.aplicativoInclusao.cliente + '_' + this.state.aplicativoInclusao.nome).set(this.state.aplicativoInclusao);
    },
    handleClickToggleIncluir() {
        this.setState({
            mostra: !this.state.mostra,
        });
    },
    handleClickEscondeIncluir() {
        this.setState({
            mostra: false,
        });
    },
});
