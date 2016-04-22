var React = require('react');

module.exports = React.createClass({
  showMessage: function(mensagem) {
    var notificacaoContainer = document.querySelector('#notificacao');

    notificacaoContainer.MaterialSnackbar.showSnackbar({
      message: mensagem
    });

    if(mensagem.indexOf('caiu') > -1) {
      new Audio('./sounds/error.mp3').play();
    } else if (mensagem.indexOf('subiu') > -1) {
      new Audio('./sounds/beep.mp3').play();
    }

  },
  render: function () {
    return <div id="notificacao" className="mdl-js-snackbar mdl-snackbar">
      <div className="mdl-snackbar__text"></div>
      <button className="mdl-snackbar__action" type="button"></button>
    </div>
  }
});
