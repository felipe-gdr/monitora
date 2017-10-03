import React from 'react';
import PropTypes from 'prop-types';
import Firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';
import Loading from '../loading';
import PainelDetalhe from './painel-detalhe';
import { ROOT_URL } from '../../constantes';

const eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

export default class UltimaQueda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duracaoUltimaQueda: 0,
            dataUltimaQueda: null,
            loading: true,
        };
    }

    componentWillMount() {
        const eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.app);

        const umaSemanaAtras = moment().subtract(7, 'day');

        eventosPorAplicativoRef.orderByChild('dataEvento').startAt(umaSemanaAtras.toDate().getTime()).on('value', function (snap) {
            const eventosDoAplicativo = _.values(snap.val()).reverse();

            _.each(eventosDoAplicativo, function (evento, i) {
                if (evento.mensagem.indexOf('caiu') > 0) {
                    const dataSubida = i > 0 ? moment(eventosDoAplicativo[i - 1].dataEvento) : moment();
                    const dataQueda = moment(evento.dataEvento);

                    this.setState({
                        duracaoUltimaQueda: dataSubida.diff(dataQueda, 'minutes'),
                        dataUltimaQueda: dataQueda,
                    });

                    return false;
                }
            }.bind(this));

            this.setState({loading: false});

        }.bind(this));

    }

    render() {
        if (this.state.loading) {
            return (
                <PainelDetalhe>
                    <Loading/>
                </PainelDetalhe>
            );
        }

        const dataUltimaQueda = this.state.dataUltimaQueda;
        if (!dataUltimaQueda) {
            return (
                <PainelDetalhe>
                    <div className='titulo'>Nenhuma queda nos últimos 7 dias</div>
                </PainelDetalhe>
            );
        }

        return (
            <PainelDetalhe
                rodape={'ocorreu em: ' + dataUltimaQueda.format('DD/MM/YYYY HH:mm')}>
                <div className='titulo'>Última queda foi a {dataUltimaQueda.fromNow()}
                    durou {this.state.duracaoUltimaQueda} minutos
                </div>
            </PainelDetalhe>
        );
    }
}

UltimaQueda.propTypes = {
    app: PropTypes.string.isRequired,
};
