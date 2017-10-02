var React = require('react');

var OrganizaServidores = require('../servicos/organiza-servidores');

module.exports = React.createClass({
    render: function () {
        var servidores = new OrganizaServidores(this.props.aplicativos).getServidoresOrganizados();
        if (!servidores) {
            return null;
        }

        return <div className="mdl-grid server-grid">
            {
                servidores.map((serv) => this.renderServidor(serv))
            }
        </div>
    },

    renderServidor: function (servidor) {
        return <div className="mdl-cell mdl-cell--2-col" key={servidor.ip} id={servidor.ip}>
            <div className="mdl-card mdl-shadow--4dp server-card">
                <div className="mdl-card__title title">
                    <h2 className="mdl-card__title-text" title={servidor.nome}>{servidor.ip}</h2>
                </div>

                <div className="mdl-card__supporting-text conteudo">
                    <div className="mdl-grid">
                        {
                            servidor.apps.map((app) => {
                                return (
                                    <div key={app.cliente + app.nome} className="mdl-cell mdl-cell--1-col">
                                        <div
                                            title={app.cliente + ' - ' + app.nome + ' (' + app.status + ')'}
                                            className={'status ' + app.status}></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    }

});
