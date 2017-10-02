import React from 'react';
import moment from 'moment';

export default React.createClass({
    render() {
        return <li className='nao-lida'>
            <span className={'mensagem ' + this.classe()}>
                <i className='material-icons'>{this.icone()}</i>
                {this.props.mensagem}
            </span>
            <div className='horario'>{moment(this.props.dataEvento).format('DD/MM/YYYY HH:mm:ss')}</div>
        </li>;
    },
    icone() {
        return this.props.mensagem.indexOf('subiu') > -1 ? 'arrow_upward' : 'arrow_downward';
    },
    classe() {
        return this.props.mensagem.indexOf('subiu') > -1 ? 'subiu' : 'caiu';
    },
});
