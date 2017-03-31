import React from 'react';
import { shallow, mount, render } from 'enzyme';

import AppGrid from '../src/components/app-grid';

const apps = {
  'App1': {
    'nome': 'aplicativo',
    'cliente': 'empresa1',
    'url': 'http//www.app1.com',
    'status': 'up',
    'detalhesServidor': {
      'versaoPopulis': '1.0.0',
      'nomePcServidor': 'server01',
      'ipServidor': '192.168.1.10'
    }
  },
  'App2': {
    'nome': 'aplicativo',
    'cliente': 'empresa2',
    'url': 'http//www.app2.com',
    'status': 'up',
    'detalhesServidor': {
      'versaoPopulis': '1.0.0',
      'nomePcServidor': 'server01',
      'ipServidor': '192.168.1.10'
    }
  }
}

describe('AppGrid', function() {
  it('possui texto informativo quando não há aplicativos', function() {
    expect(mount(<AppGrid />).find('.info').length).toBe(1);
    expect(render(<AppGrid />).text()).toEqual('Inclua aplicativos para começar');
  });

  it('não mostra nenhum um card quando não há aplicativos', function() {
    expect(mount(<AppGrid />).find('.app-card').length).toBe(0);
  });

  it('não possui texto informativo quando há aplicativos', function() {
    expect(mount(<AppGrid aplicativos={apps}/>).find('.info').length).toBe(0);
  });

  it('mostra um card para cada aplicativo na lista', function() {
    expect(mount(<AppGrid aplicativos={apps}/>).find('.app-card').length).toBe(2);
  });

  it('pode ser selecionado pela classe "app-grid"', function() {
    expect(shallow(<AppGrid aplicativos={apps}/>).is('.app-grid')).toBe(true);
  });
});