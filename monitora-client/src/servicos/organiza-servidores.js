import _ from 'lodash';

const OrganizaServidores = function (aplicativos) {
    this.aplicativos = aplicativos;
};

OrganizaServidores.prototype.getListaAplicativos = function () {
    const servidores = this.getServidoresOrganizados();

    if (!servidores) {
        return null;
    }

    const lista = [];

    servidores.forEach((serv) => {
        serv.apps.forEach((app) => {
            lista.push({
                ip: serv.ip,
                nomeServidor: serv.nome,
                tipo: serv.tipo,
                nomeApp: app.nome,
                cliente: app.cliente,
                url: app.url,
                status: app.status,
                versao: app.versao,
            });
        });
    });

    return lista;
};

OrganizaServidores.prototype.getServidoresOrganizados = function () {
    if (!this.aplicativos || this.aplicativos.length === 0) {
        return null;
    }

    const serversWeb = this._organizaServidoresWeb();
    const serversCalculo = this._organizaServidoresCalculo();

    return _.sortBy(_.union(serversWeb, serversCalculo), ['ip']);
};

OrganizaServidores.prototype._organizaServidoresWeb = function () {
    const servers = {};

    this.aplicativos.forEach((app) => {
        const ip = app.detalhesServidor.ipServidor;

        if (!servers[ip]) {
            servers[ip] = {
                ip: ip,
                nome: app.detalhesServidor.nomePcServidor,
                tipo: 'web',
                apps: [],
            };
        }

        servers[ip].apps.push({
            cliente: app.cliente,
            nome: app.nome,
            status: app.status,
            url: app.url,
            versao: app.detalhesServidor.versaoPopulis || app.detalhesServidor.versaoPopulisWeb,
        });
    });

    return _.values(servers);
};

OrganizaServidores.prototype._organizaServidoresCalculo = function () {
    const servers = {};

    this.aplicativos.forEach((app) => {
        const calculos = _.filter(app.detalhesServidor.calculos, (calc) => calc.emUsoPopulisCalculo === 'S');

        if (!calculos) {
            return servers;
        }

        calculos.forEach((calc) => {
            const ip = calc.locationPopulisCalculo;

            if (!servers[ip]) {
                servers[ip] = {
                    ip: ip,
                    nome: null,
                    apps: [],
                    tipo: 'calc',
                };
            }

            servers[ip].apps.push({
                cliente: app.cliente,
                nome: calc.versaoPopulisCalculo,
                status: calc.statusPopulisCalculo === '1' ? 'up' : 'down',
                url: null,
                versao: calc.servicoVersionPopulisCalculo,
            });

        });
    });

    return _.values(servers);
};

export default OrganizaServidores;
