import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Botao from '../src/components/botao';

describe('Botao', function() {
  it('pode ser selecionado pela classe padrao', function() {
    expect(shallow(<Botao texto="Salvar"/>).is('.mdl-button--raised')).toBe(true);
  });  

  it('pode ser selecionado pela classe da cor', function() {
    expect(shallow(<Botao texto="Salvar" cor="blue"/>).is('.mdl-button--blue')).toBe(true);
  });

  it('pode ser selecionado pela classe de tipo', function() {
    expect(shallow(<Botao texto="Salvar" tipo="circle"/>).is('.mdl-button--circle')).toBe(true);
  });

  it('possui o texto especificado', function() {
    expect(render(<Botao texto="Salvar" />).text()).toEqual('Salvar');
  });  
});