import React from 'react';
import errorMp3 from '../../public/sounds/error.mp3';
import beepMp3 from '../../public/sounds/beep.mp3';

export default React.createClass({
    showMessage (mensagem) {
        const notificacaoContainer = document.querySelector('#notificacao');

        notificacaoContainer.MaterialSnackbar.showSnackbar({
            message: mensagem,
        });

        if (mensagem.indexOf('caiu') > -1) {
            new Audio(errorMp3).play();
        } else if (mensagem.indexOf('subiu') > -1) {
            new Audio(beepMp3).play();
        }

    },
    render() {
        return <div id='notificacao' className='mdl-js-snackbar mdl-snackbar'>
            <div className='mdl-snackbar__text'/>
            <button className='mdl-snackbar__action' type='button'/>
        </div>;
    },
});
