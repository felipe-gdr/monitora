var React = require('react');

var PainelDetalhe = require('./painel-detalhe');

module.exports = React.createClass({
  render: function() {
    return (
      <PainelDetalhe
        rodape="ocorreu em: 01/04/2016 08:30 (3 hours ago)">
        <div className="titulo">Última queda durou 1 hora e 23 minutos</div>
      </PainelDetalhe>
    );
  }
})
