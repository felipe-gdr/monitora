import React from 'react';
import _ from 'lodash';

export default React.createClass({
    render() {
        const aplicativo = _.find(this.props.aplicativos, {'.key': this.props.params.app});

        if (!aplicativo) {
            return null;
        }

        return <div className='aplicativo-detalhe'>
            <h3 className='titulo-aplicativo'>
                {aplicativo.cliente} - {aplicativo.nome}
            </h3>
            <h6 className='url'>
                <a href={aplicativo.url} target='_blank'>{aplicativo.url}</a>
            </h6>
            {this.renderDetalhes(aplicativo)}
        </div>;
    },

    renderDetalhes (aplicativo) {
        const detalhes = aplicativo.detalhesServidor;
        const versaoWeb = detalhes.versaoPopulisWeb || (detalhes.versaoPopulis + '_' + detalhes.numeroBuild);

        return (
            <div className='detalhes'>
                <div className='mdl-grid summary-grid'>
                    <div className='mdl-cell mdl-cell--12-col'><h3>Web</h3></div>

                    <div className='mdl-cell mdl-cell--1-col label'>Versao</div>
                    <div className='mdl-cell mdl-cell--3-col value'>{versaoWeb}</div>

                    <div className='mdl-cell mdl-cell--2-col label'>IP Servidor</div>
                    <div className='mdl-cell mdl-cell--2-col value'>{detalhes.nomePcServidor}
                        - {detalhes.ipServidor}</div>

                    <div className='mdl-cell mdl-cell--2-col label'>Status</div>
                    <div className='mdl-cell mdl-cell--2-col value'>
                        <div
                            title={aplicativo.status}
                            className={'status ' + aplicativo.status}/>
                    </div>
                </div>
                {this.renderCalculo(aplicativo)}
                {this.renderCluster(aplicativo)}
            </div>
        );
    },

    renderCalculo (aplicativo) {
        const detalhes = aplicativo.detalhesServidor;

        if (!detalhes || !detalhes.calculos) {
            return null;
        }

        const calculos = _.filter(detalhes.calculos, (calc) => calc.emUsoPopulisCalculo === 'S');
        const versaoCalculo = _.find(calculos, (calc) => calc.servicoVersionPopulisCalculo).servicoVersionPopulisCalculo;
        const calculosUp = _.filter(calculos, (calc) => calc.statusPopulisCalculo === '1').length;
        const calculosDown = calculos.length - calculosUp;

        return (
            <div className='mdl-grid calculo-list'>
                <div className='mdl-cell mdl-cell--12-col'><h3>Calculo</h3></div>

                <div className='mdl-cell mdl-cell--2-col label'>Versao</div>
                <div className='mdl-cell mdl-cell--2-col value'>{versaoCalculo}</div>

                <div className='mdl-cell mdl-cell--2-col label'>Up</div>
                <div className='mdl-cell mdl-cell--2-col value calc-count-up'>{calculosUp}</div>

                <div className='mdl-cell mdl-cell--2-col label'>Down</div>
                <div className='mdl-cell mdl-cell--2-col value calc-count-down'>{calculosDown}</div>

                <div className='mdl-cell mdl-cell--12-col'>
                    <table className='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>
                        <thead>
                            <tr>
                                <th className='mdl-data-table__cell--non-numeric'>Servidor</th>
                                <th className='mdl-data-table__cell--non-numeric'>Nome</th>
                                <th className='mdl-data-table__cell--non-numeric'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                calculos.map((calc) => {
                                    return (
                                        <tr key={calc.versaoPopulisCalculo}>
                                            <td className='mdl-data-table__cell--non-numeric'>{calc.locationPopulisCalculo}</td>
                                            <td className='mdl-data-table__cell--non-numeric'>{calc.versaoPopulisCalculo}</td>
                                            <td className='mdl-data-table__cell--non-numeric'>
                                                <div
                                                    title={calc.statusStrPopulisCalculo}
                                                    className={'status ' + (calc.statusPopulisCalculo === '1' ? 'up' : 'down')}></div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    },

    renderCluster (aplicativo) {
        const cluster = aplicativo.cluster;

        if (!cluster) {
            return null;
        }

        const nodesUp = _.filter(cluster, (node) => node.status === 'up').length;
        const nodesDown = Object.keys(cluster).length - nodesUp;

        return (
            <div className='mdl-grid cluster-list'>
                <div className='mdl-cell mdl-cell--12-col'><h3>Cluster</h3></div>

                <div className='mdl-cell mdl-cell--2-col'></div>
                <div className='mdl-cell mdl-cell--2-col label'>Up</div>
                <div className='mdl-cell mdl-cell--2-col value node-count-up'>{nodesUp}</div>
                <div className='mdl-cell mdl-cell--2-col label'>Down</div>
                <div className='mdl-cell mdl-cell--2-col value node-count-down'>{nodesDown}</div>
                <div className='mdl-cell mdl-cell--2-col'></div>

                <div className='mdl-cell mdl-cell--12-col'>
                    <table className='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>
                        <thead>
                            <tr>
                                <th className='mdl-data-table__cell--non-numeric'>Nome</th>
                                <th className='mdl-data-table__cell--non-numeric'>Servidor</th>
                                <th className='mdl-data-table__cell--non-numeric'>Porta</th>
                                <th className='mdl-data-table__cell--non-numeric'>Url local</th>
                                <th className='mdl-data-table__cell--non-numeric'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.values(cluster).map((node) => {
                                    const match = /.*\/\/(.*):(\d{4})\/.*/g.exec(node.url);
                                    const server = match[1];
                                    const port = match[2];

                                    return (
                                        <tr key={node.nomeNode}>
                                            <td className='mdl-data-table__cell--non-numeric'>{node.nomeNode}</td>
                                            <td className='mdl-data-table__cell--non-numeric'>{server}</td>
                                            <td className='mdl-data-table__cell--non-numeric'>{port}</td>
                                            <td className='mdl-data-table__cell--non-numeric'>{node.url}</td>
                                            <td className='mdl-data-table__cell--non-numeric'>
                                                <div
                                                    title={node.status}
                                                    className={'status ' + node.status}></div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    },
});
