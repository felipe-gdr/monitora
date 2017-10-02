import React from 'react';
import Mensagem from './mensagem';

export default React.createClass({
    getInitialState() {
        return {
            mostraLista: false,
        };
    },
    render() {
        return <div className='mensagens'>
            <a className='mdl-navigation__link' onClick={this.handleClick} href='#'>
                <div
                    className='material-icons mdl-badge mdl-badge--overlap'
                    data-badge={this.props.eventos.length}>
                    message
                </div>
            </a>
            {this.state.mostraLista ? this.lista() : null}
        </div>;
    },
    lista() {
        let count = 0;
        const eventos = this.props.eventos.map(function (evento) {
            return <Mensagem {...evento} key={count++}/>;
        });

        return <div className='mdl-shadow--2dp lista-mensagens'>
            <ul>
                {eventos}
            </ul>
            <span className='rodape'>Atualizado em 26/03/2016 18:14</span>
        </div>;
    },
    handleClick() {
        if (this.state.mostraLista) {
            this.props.handleFechaMensagens();
        }

        this.setState({
            mostraLista: !this.state.mostraLista,
        });
    },
});
