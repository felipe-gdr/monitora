import React from 'react';
import PropTypes from 'prop-types';

export default class PainelDetalhe extends React.Component {
    render() {
        return <div className='painel-detalhe'>
            <div className='mdl-card mdl-shadow--2dp'>
                <div className={'mdl-card__title mdl-card--expand status-' + this.props.status}>
                    {this.props.children}
                </div>
                <div className='mdl-card__actions mdl-card--border'>
                    {this.props.rodape}
                </div>
            </div>
        </div>;
    }
}

PainelDetalhe.propTypes = {
    status: PropTypes.string.isRequired,
    rodape: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired,
};
