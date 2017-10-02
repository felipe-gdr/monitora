import moment from 'moment';

const OrganizaEventos = function (eventos) {
    this.eventos = eventos;
};

const getTipoEvento = function (evento) {
    const palavras = evento.mensagem.split(' ');
    return palavras[palavras.length - 1];
};

OrganizaEventos.prototype.getEventosOrganizados = function () {
    if (!this.eventos || this.eventos.length === 0) {
        return null;
    }

    const eventosOrganizados = [];

    let tipoUltimoEvento = '';
    let dataUltimoEvento = 0;

    for (let i = 0; i < this.eventos.length; i++) {
        const evento = this.eventos[i];

        const tipoEvento = getTipoEvento(evento);
        const dataEvento = evento.dataEvento;

        if (tipoEvento !== tipoUltimoEvento) {
            if (eventosOrganizados.length > 0) {
                eventosOrganizados[eventosOrganizados.length - 1].duracao = dataEvento - dataUltimoEvento;
            }

            eventosOrganizados.push({
                dataEvento: dataEvento,
                dataEventoStr: moment(dataEvento).format('DD/MM/YYYY HH:mm:ss'),
                evento: tipoEvento,
            });

            tipoUltimoEvento = tipoEvento;
            dataUltimoEvento = dataEvento;
        }
    }

    // retira eventos 'instáveis' que foram seguidos por quedas
    const eventosOrganizadosFinal = [];
    for (let i = 0; i < eventosOrganizados.length; i++) {
        const evento = eventosOrganizados[i];

        if (i + 1 < eventosOrganizados.length) {
            const proximoEvento = eventosOrganizados[i + 1];

            if (evento.evento === 'instável' && proximoEvento.evento === 'caiu') {
                // retirando evento instável seguido por queda
            } else {
                eventosOrganizadosFinal.push(evento);
            }
        } else {
            eventosOrganizadosFinal.push(evento);
        }
    }

    return eventosOrganizadosFinal;
};

export default OrganizaEventos;
