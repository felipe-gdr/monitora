import React from 'react';
import { shallow, mount, render } from 'enzyme';

import AppGrid from '../src/components/app-grid';

import { appList } from './apps'

describe('AppGrid', function() {
  it('possui texto informativo quando não há aplicativos', function() {
    expect(mount(<AppGrid />).find('.info').length).toBe(1);
    expect(render(<AppGrid />).text()).toEqual('Inclua aplicativos para começar');
  });

  it('não mostra nenhum um card quando não há aplicativos', function() {
    expect(mount(<AppGrid />).find('.app-card').length).toBe(0);
  });

  it('não possui texto informativo quando há aplicativos', function() {
    expect(mount(<AppGrid aplicativos={appList}/>).find('.info').length).toBe(0);
  });

  it('mostra um card para cada aplicativo na lista', function() {
    expect(mount(<AppGrid aplicativos={appList}/>).find('.app-card').length).toBe(2);
  });

  it('pode ser selecionado pela classe "app-grid"', function() {
    expect(shallow(<AppGrid aplicativos={appList}/>).is('.app-grid')).toBe(true);
  });
});