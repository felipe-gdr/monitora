import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ReactFire from 'reactfire';
import Firebase from 'firebase';
// import _ from 'lodash';
// import moment from 'moment';

// Url Firebase
import {ROOT_URL} from '../constantes';

// const eventosPorAplicativoUrl = ROOT_URL + 'eventosPorAplicativo';

// import PainelDetalhe from './paineis-detalhes/painel-detalhe';
import ListaEventos from './paineis-detalhes/lista-eventos';
import StatusAtual from './paineis-detalhes/status-atual';
import UltimaQueda from './paineis-detalhes/ultima-queda';
import TempoNoAr from './paineis-detalhes/tempo-no-ar';
// import OrganizaEventos from '../servicos/organiza-eventos';

export default createReactClass({
    displayName: 'app-estatisticas',
    mixins: [ReactFire],
    propTypes: {
        params: PropTypes.object.isRequired,
    },

    getInitialState() {
        return {aplicativo: null, eventos: [], eventosOrganizados: []};
    },

    componentWillMount() {
        this.fbAplicativo = new Firebase(ROOT_URL + 'aplicativos/' + this.props.params.app);
        this.bindAsObject(this.fbAplicativo, 'aplicativo');

        /*
        const eventosPorAplicativoRef = new Firebase(eventosPorAplicativoUrl + '/' + this.props.params.app);

        const umaSemanaAtras = moment().subtract(7, 'day');

        eventosPorAplicativoRef.orderByChild('dataEvento').startAt(umaSemanaAtras.toDate().getTime()).once('value', function (snap) {
          const eventosOrganizados = new OrganizaEventos(_.values(snap.val())).getEventosOrganizados().reverse();

          this.setState({
            eventosOrganizados: eventosOrganizados
          });

        }.bind(this));
        */
    },

    render() {
        if (!this.state.aplicativo) {
            return null;
        }

        return <div className='aplicativo-estatisticas'>
            <h3 className='titulo-aplicativo'>
                {this.state.aplicativo.cliente} {this.state.aplicativo.nome}
            </h3>

            <div className='paineis-detalhes'>
                <StatusAtual aplicativo={this.state.aplicativo}/>

                <UltimaQueda app={this.props.params.app}/>

                <TempoNoAr app={this.props.params.app}/>
            </div>

            <ListaEventos app={this.props.params.app}/>
        </div>;
    },
});

