import React from 'react';
import PropTypes from 'prop-types';

export default class Botao extends React.Component {
    render() {
        return <button
            onClick={this.props.onClick}
            className={'mdl-button mdl-js-button mdl-js-ripple-effect' + this.tipo() + this.cor()}
            title={this.props.title}>
            {this.renderConteudo()}
        </button>;
    }

    renderConteudo() {
        let conteudo;

        if (this.props.texto) {
            conteudo = this.props.texto;
        }

        if (this.props.icone) {
            conteudo = <i className='material-icons'>{this.props.icone}</i>;
        }

        return conteudo;
    }

    tipo() {
        if (!this.props.tipo) {
            return ' mdl-button--raised';
        }

        return ' mdl-button--' + this.props.tipo;
    }

    cor() {
        if (!this.props.cor) {
            return '';
        }

        return ' mdl-button--' + this.props.cor;
    }
}

Botao.propTypes = {
    texto: PropTypes.string.isRequired,
    icone: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    cor: PropTypes.string.isRequired,
};
