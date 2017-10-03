import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

export default class AtualizacaoDisplay extends React.Component {
    componentWillMount() {
        setInterval(function () {
            this.forceUpdate();
        }.bind(this), 10000);
    }

    render() {
        if (!this.props.dataUltimaAtualizacao) {
            return <div>desconhecido</div>;
        }

        return <div className='atualizacao-display'>
            Última atualizaçao: {new Moment(this.props.dataUltimaAtualizacao).fromNow()}
        </div>;

    }
}

AtualizacaoDisplay.propTypes = {
    dataUltimaAtualizacao: PropTypes.string.isRequired,
};
