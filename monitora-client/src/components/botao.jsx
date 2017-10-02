var React = require('react');

module.exports = React.createClass({
    render: function () {
        return <button
            onClick={this.props.onClick}
            className={"mdl-button mdl-js-button mdl-js-ripple-effect" + this.tipo() + this.cor()}
            title={this.props.title}>
            {this.renderConteudo()}
        </button>
    },
    renderConteudo: function () {
        var conteudo;

        if (this.props.texto) {
            conteudo = this.props.texto;
        }

        if (this.props.icone) {
            conteudo = <i className="material-icons">{this.props.icone}</i>;
        }

        return conteudo;
    },
    tipo: function () {
        if (!this.props.tipo) {
            return ' mdl-button--raised';
        }

        return ' mdl-button--' + this.props.tipo;
    },
    cor: function () {
        if (!this.props.cor) {
            return '';
        }

        return ' mdl-button--' + this.props.cor;
    }
})
