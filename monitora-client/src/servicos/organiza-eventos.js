var moment = require('moment');

module.exports = OrganizaEventos = function(eventos) {
  this.eventos = eventos;
}

var getTipoEvento = function(evento) {
  var palavras = evento.mensagem.split(" ");
  return palavras[palavras.length - 1];
}

OrganizaEventos.prototype.getEventosOrganizados = function() {
    if(!this.eventos || this.eventos.length == 0) {
      return null;
    }

    var eventosOrganizados = [];

    var agora = moment();

    var tipoUltimoEvento = '';
    var dataUltimoEvento = 0;

    for(var i = 0; i < this.eventos.length; i++) {
      var evento = this.eventos[i];

      var tipoEvento = getTipoEvento(evento);
      var dataEvento = evento.dataEvento;

      if(tipoEvento != tipoUltimoEvento) {
        if(eventosOrganizados.length > 0) {
          eventosOrganizados[eventosOrganizados.length - 1].duracao = dataEvento - dataUltimoEvento;
        }

        eventosOrganizados.push({
          dataEvento: dataEvento,
          dataEventoStr: moment(dataEvento).format('DD/MM/YYYY HH:mm:ss'),
          evento: tipoEvento
        });

        tipoUltimoEvento = tipoEvento;
        dataUltimoEvento = dataEvento;
      }
    }

    // retira eventos 'instáveis' que foram seguidos por quedas
    var eventosOrganizadosFinal = []
    for(var i = 0; i < eventosOrganizados.length; i++) {
      var evento = eventosOrganizados[i];

      if(i + 1 < eventosOrganizados.length) {
        var proximoEvento = eventosOrganizados[i + 1];

        if(evento.evento == 'instável' && proximoEvento.evento == 'caiu') {
          // retirando evento instável seguido por queda
        } else {
          eventosOrganizadosFinal.push(evento);
        }
      } else {
        eventosOrganizadosFinal.push(evento);
      }
    }

    return eventosOrganizadosFinal;
}
