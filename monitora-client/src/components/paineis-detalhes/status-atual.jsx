import React from 'react';
import moment from 'moment';
import Firebase from 'firebase';
import Loading from '../loading';
import PainelDetalhe from './painel-detalhe';
import { ROOT_URL } from '../../constantes';

const eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

export default React.createClass({
    getInitialState() {
        return {
            eventoMaisRecente: null,
        };
    },
    componentWillMount() {
        const eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.aplicativo.key);

        eventosPorAplicativoRef.orderByChild('dataEvento').limitToLast(1).on('child_added', function (snap) {
            this.setState({
                eventoMaisRecente: snap.val(),
            });

        }.bind(this));
    },
    render() {
        return (
            <PainelDetalhe
                rodape={this.renderDesdeStatus()}
                status={this.props.aplicativo.status}>
                {this.renderStatus()}
            </PainelDetalhe>
        );
    },
    renderStatus() {
        if (!this.state.eventoMaisRecente) {
            return <Loading/>;
        }

        const desde = 'a ' + (moment(this.state.eventoMaisRecente.dataEvento).fromNow());

        return <div className='titulo'>
            Status atual : {this.props.aplicativo.status} ({desde})
        </div>;
    },
    renderDesdeStatus() {
        if (this.state.eventoMaisRecente) {
            return 'desde : ' + moment(this.state.eventoMaisRecente.dataEvento).format('DD/MM/YYYY HH:mm');
        }
    },
});
