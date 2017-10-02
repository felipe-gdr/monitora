const assert = require('chai').assert;
const expect = require('chai').expect;
const moment = require('moment');

const OrganizaEventos = require('../src/servicos/organiza-eventos').default;

const emMillis = function (horario) {
    const data = '01/01/2001';
    return moment(data + ' ' + horario, 'DD/MM/YYYY HH:mm:ss').toDate().getTime();
};

describe('OrganizaEventos', function () {
    describe('#eventosOrganizados', function () {
        it('retorna "null" quando "eventos" é nulo', function () {
            const organizaEventos = new OrganizaEventos(null);

            assert.isNull(organizaEventos.getEventosOrganizados());
        });

        it('retorna "null" quando "eventos" está vazio', function () {
            const organizaEventos = new OrganizaEventos([]);

            assert.isNull(organizaEventos.getEventosOrganizados());
        });

        it('retorna uma queda e uma subida', function () {
            const eventos = [
                {
                    dataEvento: emMillis('09:43:10'),
                    mensagem: 'GLR : Populis I ficou instável',
                },
                {
                    dataEvento: emMillis('09:43:30'),
                    mensagem: 'GLR : Populis I continua instável',
                },
                {
                    dataEvento: emMillis('09:43:50'),
                    mensagem: 'GLR : Populis I continua instável',
                },
                {
                    dataEvento: emMillis('09:44:10'),
                    mensagem: 'GLR : Populis I caiu',
                },
                {
                    dataEvento: emMillis('10:00:10'),
                    mensagem: 'GLR : Populis I subiu',
                },
            ];

            const organizaEventos = new OrganizaEventos(eventos);

            const eventosOrganizados = [
                {
                    dataEvento: emMillis('09:44:10'),
                    dataEventoStr: '01/01/2001 09:44:10',
                    evento: 'caiu',
                    duracao: emMillis('10:00:10') - emMillis('09:44:10'),
                },
                {
                    dataEvento: emMillis('10:00:10'),
                    dataEventoStr: '01/01/2001 10:00:10',
                    evento: 'subiu',
                },
            ];

            expect(organizaEventos.getEventosOrganizados()).to.deep.equal(eventosOrganizados);
        });

        it('retorna uma instabilidade e uma subida', function () {
            const eventos = [
                {
                    dataEvento: emMillis('09:43:10'),
                    mensagem: 'GLR : Populis I ficou instável',
                },
                {
                    dataEvento: emMillis('09:43:30'),
                    mensagem: 'GLR : Populis I continua instável',
                },
                {
                    dataEvento: emMillis('09:43:50'),
                    mensagem: 'GLR : Populis I continua instável',
                },
                {
                    dataEvento: emMillis('09:44:00'),
                    mensagem: 'GLR : Populis I subiu',
                },
            ];

            const organizaEventos = new OrganizaEventos(eventos);

            const eventosOrganizados = [
                {
                    dataEvento: emMillis('09:43:10'),
                    dataEventoStr: '01/01/2001 09:43:10',
                    evento: 'instável',
                    duracao: emMillis('09:44:00') - emMillis('09:43:10'),
                },
                {
                    dataEvento: emMillis('09:44:00'),
                    dataEventoStr: '01/01/2001 09:44:00',
                    evento: 'subiu',
                },
            ];

            expect(organizaEventos.getEventosOrganizados()).to.deep.equal(eventosOrganizados);
        });

        it('retorna uma subida uma instabilidade, uma subida e uma queda', function () {
            const eventos = [
                {
                    dataEvento: emMillis('07:10:00'),
                    mensagem: 'GLR : Populis I subiu',
                },
                {
                    dataEvento: emMillis('10:20:00'),
                    mensagem: 'GLR : Populis I ficou instável',
                },
                {
                    dataEvento: emMillis('10:20:20'),
                    mensagem: 'GLR : Populis I subiu',
                },
                {
                    dataEvento: emMillis('12:30:00'),
                    mensagem: 'GLR : Populis I ficou instável',
                },
                {
                    dataEvento: emMillis('12:30:20'),
                    mensagem: 'GLR : Populis I continua instável',
                },
                {
                    dataEvento: emMillis('12:30:40'),
                    mensagem: 'GLR : Populis I caiu',
                },
            ];

            const organizaEventos = new OrganizaEventos(eventos);

            const eventosOrganizados = [
                {
                    dataEvento: emMillis('07:10:00'),
                    dataEventoStr: '01/01/2001 07:10:00',
                    evento: 'subiu',
                    duracao: emMillis('10:20:00') - emMillis('07:10:00'),
                },
                {
                    dataEvento: emMillis('10:20:00'),
                    dataEventoStr: '01/01/2001 10:20:00',
                    evento: 'instável',
                    duracao: emMillis('10:20:20') - emMillis('10:20:00'),
                },
                {
                    dataEvento: emMillis('10:20:20'),
                    dataEventoStr: '01/01/2001 10:20:20',
                    evento: 'subiu',
                    duracao: emMillis('12:30:00') - emMillis('10:20:20'),
                },
                {
                    dataEvento: emMillis('12:30:40'),
                    dataEventoStr: '01/01/2001 12:30:40',
                    evento: 'caiu',
                },
            ];

            expect(organizaEventos.getEventosOrganizados()).to.deep.equal(eventosOrganizados);
        });

    });
});
