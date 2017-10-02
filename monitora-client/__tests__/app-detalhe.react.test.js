import React from 'react';
import {shallow, mount} from 'enzyme';

import AppDetalhe from '../src/components/app-detalhe';

import {appList} from '../__mocks__/apps';

let apps = {};

describe('AppDetalhe', function () {
    beforeEach(function () {
        apps = appList();
    });

    it('pode ser selecionado pela classe "aplicativo-detalhe"', function () {
        expect(shallow(
            <AppDetalhe
                aplicativos={apps}
                params={{app: 'empresa1_aplicativo'}}/>
        ).is('.aplicativo-detalhe')).toBe(true);
    });

    it('marca o status do servidor como "up"', function () {
        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa1_aplicativo'}}/>;

        expect(mount(wrapper).find('.summary-grid .status.up').length).toBe(1);
    });

    it('marca o status do servidor como "down"', function () {
        // Marca aplicativo como status 'down'
        apps.App1.status = 'down';

        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa1_aplicativo'}}/>;

        expect(mount(wrapper).find('.summary-grid .status.down').length).toBe(1);
    });

    it('renderiza os elementos dos serviços de cálculo', function () {
        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa1_aplicativo'}}/>;

        expect(mount(wrapper).find('.calculo-list').length).toBe(1);
        expect(mount(wrapper).find('.cluster-list').length).toBe(0);

    });

    it('marca os serviços de cálculo como "up"', function () {
        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa1_aplicativo'}}/>;

        expect(mount(wrapper).find('.calculo-list .calc-count-up').text()).toBe('2');
        expect(mount(wrapper).find('.calculo-list .calc-count-down').text()).toBe('0');
        expect(mount(wrapper).find('.calculo-list div[title="Disponível"].status.up').length).toBe(2);
    });

    it('marca um serviço de cálculo como "up" e outro como down', function () {
        apps.App1.detalhesServidor.calculos[0].statusPopulisCalculo = '0';
        apps.App1.detalhesServidor.calculos[0].statusStrPopulisCalculo = 'Indisponível';

        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa1_aplicativo'}}/>;

        expect(mount(wrapper).find('.calculo-list .calc-count-up').text()).toBe('1');
        expect(mount(wrapper).find('.calculo-list .calc-count-down').text()).toBe('1');
        expect(mount(wrapper).find('.calculo-list div[title="Disponível"].status.up').length).toBe(1);
        expect(mount(wrapper).find('.calculo-list div[title="Indisponível"].status.down').length).toBe(1);
    });

    it('renderiza os elementos do cluster', function () {
        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa2_aplicativo'}}/>;

        expect(mount(wrapper).find('.cluster-list').length).toBe(1);
        expect(mount(wrapper).find('.calculo-list').length).toBe(0);
    });

    it('marca os nodes do cluster como "up"', function () {
        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa2_aplicativo'}}/>;

        expect(mount(wrapper).find('.cluster-list .node-count-up').text()).toBe('2');
        expect(mount(wrapper).find('.cluster-list .node-count-down').text()).toBe('0');
        expect(mount(wrapper).find('.cluster-list div[title="up"].status.up').length).toBe(2);
    });

    it('marca um dos nodes do cluster como "up" e outro como "down"', function () {
        apps.App2.cluster.master.status = 'down';

        const wrapper = <AppDetalhe aplicativos={apps} params={{app: 'empresa2_aplicativo'}}/>;

        expect(mount(wrapper).find('.cluster-list .node-count-up').text()).toBe('1');
        expect(mount(wrapper).find('.cluster-list .node-count-down').text()).toBe('1');
        expect(mount(wrapper).find('.cluster-list div[title="up"].status.up').length).toBe(1);
        expect(mount(wrapper).find('.cluster-list div[title="down"].status.down').length).toBe(1);
    });
});
