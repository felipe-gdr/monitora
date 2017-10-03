import React from 'react';
import PropTypes from 'prop-types';

export default class TextField extends React.Component {
    render() {
        return (
            <div className='mdl-textfield mdl-js-textfield'>
                <input
                    className={'mdl-textfield__input ' + this.props.className}
                    type='text'
                    id='sample1'
                    onChange={this.handleInputChanged}/>
                <label
                    className='mdl-textfield__label'
                    htmlFor='sample1'>
                    {this.props.nome}
                </label>
            </div>
        );
    }

    handleInputChanged(event) {
        this.props.onTextChanged(event.target.value);
    }
}

TextField.propTypes = {
    nome: PropTypes.string.isRequired,
    onTextChanged: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
};
