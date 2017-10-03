import React from 'react';
import PropTypes from 'prop-types';
import Mensagens from './mensagens';
import { Link } from 'react-router';
import logo from '../../public/images/monitora-down.png';
import Menu from './menu';

export default class Header extends React.Component {
    render() {
        return <header className='mdl-layout__header mdl-layout__header--scroll header'>
            <div className='mdl-layout__header-row'>
                <img className='logo' src={logo} alt='logo'/>
                <span className='mdl-layout-title'><Link to='/app' className='mdl-navigation__link'>Monitoramento</Link></span>
                <div className='mdl-layout-spacer'/>
                <nav className='mdl-navigation'>
                    <a className='mdl-navigation__link qtde-up' href=''>
                        {this.qtdeUp()}
                        <label className='mdl-button mdl-js-button mdl-button--icon' htmlFor='fixed-header-drawer-exp'>
                            <i className='material-icons'>arrow_upward</i>
                        </label>
                    </a>
                    <a className='mdl-navigation__link qtde-down' href=''>
                        {this.qtdeDown()}
                        <label className='mdl-button mdl-js-button mdl-button--icon' htmlFor='fixed-header-drawer-exp'>
                            <i className='material-icons'>arrow_downward</i>
                        </label>
                    </a>
                    <Mensagens eventos={this.props.eventos} handleFechaMensagens={this.props.handleFechaMensagens}/>
                    <Menu/>
                </nav>
            </div>
        </header>;
    }

    qtdeUp() {
        return this.props.aplicativos.filter(function (aplicativo) {
            return aplicativo.status === 'up';
        }).length;
    }

    qtdeDown() {
        return this.props.aplicativos.filter(function (aplicativo) {
            return aplicativo.status !== 'up';
        }).length;
    }
}

Header.propTypes = {
    aplicativos: PropTypes.array.isRequired,
    eventos: PropTypes.array.isRequired,
    handleFechaMensagens: PropTypes.func.isRequired,
};
