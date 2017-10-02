var React = require('react');
var _ = require('lodash');

var Link = require('react-router').Link;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            hovering: false
        }
    },
    render: function () {
        var classes = "mdl-cell mdl-cell--2-col-desktop mdl-cell--4-col-tablet mdl-cell--12-col-phone app-card mdl-card mdl-shadow--2dp" + (this.state.hovering ? ' ativo' : '');

        return <div
            className={classes}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
            <Link to={'app/' + this.props.cliente + "_" + this.props.nome}>
                <div className={"status-" + this.props.status + " mdl-card__title"}>
                    <h4 className="mdl-card__title-text">{this.props.cliente + " : " + this.props.nome}</h4>
                </div>
            </Link>
            <div className="mdl-card__supporting-text">
                {this.detalhes()}
            </div>
            <div className="app-rodape mdl-card__actions mdl-card--border">
                Desde: {this.props.desde}
            </div>
            <div className="mdl-card__menu">
                {this.cluster()}
                {this.calculo()}
            </div>
        </div>
    },
    detalhes: function () {
        var versaoApp = this.props.detalhesServidor.versaoPopulis || this.props.detalhesServidor.versaoPopulisWeb
        return <ul className="detalhes-app">
            <li>Versao: {versaoApp}</li>
            <li>Servidor: {this.props.detalhesServidor.nomePcServidor}</li>
            <li>IP: {this.props.detalhesServidor.ipServidor}</li>
        </ul>;
    },
    cluster: function () {
        if (this.props.cluster) {
            var nodes = _.values(this.props.cluster).map(function (node) {
                return <div
                    key={node.nomeNode}
                    className={"node status-" + node.status}
                    title={node.nomeNode + ' - ' + node.status}
                />
            });

            return <div className="nodes">
                {nodes}
            </div>
        }

    },
    calculo: function () {
        var detalhesServidor = this.props.detalhesServidor
        if (detalhesServidor && detalhesServidor.calculos) {
            // Verifica se todos os serviços de cálculo estão no ar
            var calcNoAr = detalhesServidor.calculos.every(function (c) {
                // Serviços que não estão em uso não são considerados
                return c.emUsoPopulisCalculo === 'N' || c.statusPopulisCalculo === "1"
            })

            return <div className="servico-calculo">
                <button
                    className="mdl-button mdl-button--icon mdl-js-button">
                    <i className={`material-icons ${calcNoAr ? '' : 'down'}`}>settings</i>
                </button>
            </div>
        }
        return null
    },
    handleMouseEnter: function () {
        this.setState({
            hovering: true
        });
    },
    handleMouseLeave: function () {
        this.setState({
            hovering: false
        });
    }
});
