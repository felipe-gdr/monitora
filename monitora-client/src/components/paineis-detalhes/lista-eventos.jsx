import React from 'react';
import Firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';

import Mensagem from '../mensagem';

// Url Firebase
import { ROOT_URL } from '../../constantes';

const eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

const QTDE_DIAS_BUSCA = 7;

export default React.createClass({
    getInitialState() {
        return {
            eventos: [],
        };
    },
    componentWillMount() {
        const eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.app);

        const periodoBusca = moment().subtract(QTDE_DIAS_BUSCA, 'day').toDate().getTime();

        eventosPorAplicativoRef.orderByChild('dataEvento').startAt(periodoBusca).on('value', function (snap) {
            const eventosDoAplicativo = _.values(snap.val()).reverse();

            this.setState({
                eventos: eventosDoAplicativo,
            });

        }.bind(this));

    },
    render() {
        return (
            <div className='lista-de-eventos mdl-shadow--2dp'>
                <h5 className='titulo'>Eventos nos últimos {QTDE_DIAS_BUSCA} dias</h5>
                <ul>
                    {this.listaEventos()}
                </ul>
            </div>
        );
    },
    listaEventos() {
        if (this.state.eventos.length == 0) {
            return <div>Nenhuma novidade </div>;
        }

        return this.state.eventos.map(function (evento) {
            return <Mensagem {...evento} key={evento.dataEvento}/>;
        });
    },
});
