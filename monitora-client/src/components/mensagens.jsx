var React = require('react');
var Mensagem = require('./mensagem');
var _ = require('lodash');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            mostraLista: false
        }
    },
    render: function () {
        return <div className="mensagens">
            <a className="mdl-navigation__link"
               onClick={this.handleClick}
               href="#">
                <div
                    className="material-icons mdl-badge mdl-badge--overlap"
                    data-badge={this.props.eventos.length}>
                    message
                </div>
            </a>
            {this.state.mostraLista ? this.lista() : null}
        </div>
    },
    lista: function () {
        var count = 0;
        var eventos = this.props.eventos.map(function (evento) {
            return <Mensagem {...evento} key={count++}/>
        });

        return <div className="mdl-shadow--2dp lista-mensagens">
            <ul>
                {eventos}
            </ul>
            <span className="rodape">Atualizado em 26/03/2016 18:14</span>
        </div>
    },
    handleClick: function () {
        if (this.state.mostraLista) {
            this.props.handleFechaMensagens();
        }

        this.setState({
            mostraLista: !this.state.mostraLista
        });
    }
});
