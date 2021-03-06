import React from 'react';
import {shallow, mount} from 'enzyme';

import AppCard from '../src/components/app-card';

import {appComplete} from '../__mocks__/apps';

let app = {};

describe('App', function () {
    beforeEach(function () {
        app = appComplete();
    });

    it('pode ser selecionado pela classe "app-card"', function () {
        expect(shallow(<AppCard {...app}/>).is('.app-card')).toBe(true);
    });

    it('contém todos os elementos de um aplicativo em cluster e com cálculo, com todos os serviços no ar', function () {
        const wrapper = <AppCard {...app}/>;

        expect(mount(wrapper).find('.node.status-up').length).toBe(2);
        expect(mount(wrapper).find('.servico-calculo').length).toBe(1);
        expect(mount(wrapper).find('.servico-calculo .down').length).toBe(0);
    });

    it('contém classe de aplicativo "up"', function () {
        const wrapper = <AppCard {...app} />;

        expect(mount(wrapper).find('.mdl-card__title.status-up').length).toBe(1);
    });

    it('contém classe de aplicativo "down"', function () {
        app.status = 'down';

        const wrapper = <AppCard {...app} />;

        expect(mount(wrapper).find('.mdl-card__title.status-down').length).toBe(1);
    });

    it('não contém elementos de aplicativo em cluster e com cálculo quando os mesmos não existem', function () {
        delete app.cluster;
        delete app.detalhesServidor.calculos;

        const wrapper = <AppCard {...app}/>;

        expect(mount(wrapper).find('.node').length).toBe(0);
        expect(mount(wrapper).find('.servico-calculo').length).toBe(0);
    });

    it('contém classe de node "down"', function () {
        app.cluster.master.status = 'down';

        const wrapper = <AppCard {...app} />;

        expect(mount(wrapper).find('.node.status-down').length).toBe(1);
        expect(mount(wrapper).find('.node.status-up').length).toBe(1);
    });

    it('contém classe de serviço de cálculo "down"', function () {
        app.detalhesServidor.calculos[0].statusPopulisCalculo = 0;

        const wrapper = <AppCard {...app} />;

        expect(mount(wrapper).find('.servico-calculo .down').length).toBe(1);
    });

    it('contém classe de serviço de cálculo "up" quando serviço fora do ar não está em uso', function () {
        app.detalhesServidor.calculos[0].emUsoPopulisCalculo = 'N';
        app.detalhesServidor.calculos[0].statusPopulisCalculo = '0';

        const wrapper = <AppCard {...app} />;

        expect(mount(wrapper).find('.servico-calculo .down').length).toBe(0);
    });

    it('executa eventos do mouse', function () {
        const wrapper = shallow(<AppCard {...app}/>);

        wrapper.simulate('mouseEnter');

        expect(wrapper.is('.ativo')).toBe(true);

        wrapper.simulate('mouseLeave');

        expect(wrapper.is('.ativo')).toBe(false);

    });
});
