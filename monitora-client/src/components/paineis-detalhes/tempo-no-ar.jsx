import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import Firebase from 'firebase';
import PainelDetalhe from './painel-detalhe';
import OrganizaEventos from '../../servicos/organiza-eventos';
import Loading from '../loading';
import {ROOT_URL} from '../../constantes';

const eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

const QTDE_DIAS_BUSCA = 7;

export default class TempoNoAr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            porcentagemUp: 0,
            porcentagemInstavel: 0,
            porcentagemDown: 0,
            loading: true,
        };
    }

    componentWillMount() {
        const eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.app);
        const periodoBusca = moment().subtract(QTDE_DIAS_BUSCA, 'day').toDate().getTime();

        eventosPorAplicativoRef.orderByChild('dataEvento').startAt(periodoBusca).on('value', function (snap) {
            const eventosDoAplicativo = _.values(snap.val());

            const eventosOrganizados = new OrganizaEventos(eventosDoAplicativo).getEventosOrganizados();

            const tempos = {
                subiu: 0,
                instavel: 0,
                caiu: 0,
                total: 0,
            };

            eventosOrganizados.forEach(function (evento) {
                if (!evento.duracao) {
                    evento.duracao = moment().diff(moment(evento.dataEvento));
                }

                const duracao = (evento.duracao / 1000);

                tempos[evento.evento] += duracao;
                tempos.total += duracao;
            });

            this.setState({
                porcentagemUp: tempos.subiu / tempos.total,
                porcentagemDown: tempos.caiu / tempos.total,
                porcentagemInstavel: tempos['instável'] / tempos.total,
                loading: false,
            });
        }.bind(this));
    }

    render() {
        if (this.state.loading) {
            return ( <PainelDetalhe><Loading/></PainelDetalhe>);
        }

        return (
            <PainelDetalhe>
                <h5>Últimos {QTDE_DIAS_BUSCA} dias</h5>
                <div className='tempo-no-ar'>
                    <ul className='demo-list-icon mdl-list'>
                        <li className='mdl-list__item'>
                            <span className='mdl-list__item-primary-content'>
                                <i className='material-icons mdl-list__item-icon status-up'>arrow_upward</i>
                                Up: {(this.state.porcentagemUp * 100).toFixed(2)}%
                            </span>
                        </li>
                        <li className='mdl-list__item'>
                            <span className='mdl-list__item-primary-content'>
                                <i className='material-icons mdl-list__item-icon status-unstable'>arrow_downward</i>
                                Instavel: {(this.state.porcentagemInstavel * 100).toFixed(2)}%
                            </span>
                        </li>
                        <li className='mdl-list__item'>
                            <span className='mdl-list__item-primary-content'>
                                <i className='material-icons mdl-list__item-icon status-down'>arrow_downward</i>
                                Down: {(this.state.porcentagemDown * 100).toFixed(2)}%
                            </span>
                        </li>
                    </ul>
                </div>
            </PainelDetalhe>
        );
    }
}

TempoNoAr.propTypes = {
    app: PropTypes.object.isRequired,
};
