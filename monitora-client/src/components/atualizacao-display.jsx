import React from 'react';
import Moment from 'moment';

export default React.createClass({
    componentWillMount() {
        setInterval(function () {
            this.forceUpdate();
        }.bind(this), 10000);
    },
    render() {
        if (!this.props.dataUltimaAtualizacao) {
            return <div>desconhecido</div>;
        }

        return <div className='atualizacao-display'>
            Última atualizaçao: {new Moment(this.props.dataUltimaAtualizacao).fromNow()}
        </div>;

    },
});
