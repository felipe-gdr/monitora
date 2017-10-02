import React from 'react';
import moment from 'moment';
import {mount} from 'enzyme';

import Mensagem from '../src/components/mensagem';

describe('Mensagem', function () {
    it('contem as classes referentes ao evento "subiu"', function () {
        const wrapper = mount(<Mensagem mensagem="App subiu"/>);

        expect(wrapper.find('.mensagem.subiu').length).toBe(1);
        expect(wrapper.find('.material-icons').text()).toBe('arrow_upward');
    });

    it('contem as classes referentes ao evento "caiu" quando há instabilidade', function () {
        const wrapper = mount(<Mensagem mensagem="App está instável"/>);

        expect(wrapper.find('.mensagem.caiu').length).toBe(1);
        expect(wrapper.find('.material-icons').text()).toBe('arrow_downward');
    });

    it('contem as classes referentes ao evento "caiu" quando há queda', function () {
        const wrapper = mount(<Mensagem mensagem="App está caiu"/>);

        expect(wrapper.find('.mensagem.caiu').length).toBe(1);
        expect(wrapper.find('.material-icons').text()).toBe('arrow_downward');
    });

    it('renderiza o horário no formato correto', function () {
        const dataEvento = moment('24/04/2017 18:50', 'DD/MM/YYYY HH:mm').valueOf();

        const wrapper = mount(<Mensagem mensagem="App subiu" dataEvento={dataEvento}/>);

        expect(wrapper.find('.horario').text()).toBe('24/04/2017 18:50:00');
    });
});
