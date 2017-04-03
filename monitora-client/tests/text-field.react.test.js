import React from 'react';
import { shallow, mount, render } from 'enzyme';

import TextField from '../src/components/text-field';

describe('TextField', function() {
  it('pode ser selecionado pela classe', function() {
    expect(mount(<TextField nome="Nome" className="info" />).find('.info').length).toBe(1);
  });

  it('possui o texto especificado', function() {
    expect(render(<TextField nome="Nome" />).text()).toEqual('Nome');
  });  

  it('renderiza sem gerar um erro', function() {
    expect(shallow(<TextField nome="Nome"/>)
      .contains(<label className="mdl-textfield__label" htmlFor="sample1">Nome</label>)).toBe(true);
  });
});