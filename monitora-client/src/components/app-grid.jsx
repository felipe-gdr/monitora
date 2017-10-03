import React from 'react';
import PropTypes from 'prop-types';
import AppCard from './app-card';

export default class AppGrid extends React.Component {
    render() {
        return <div className='app-grid'>
            <div className='mdl-grid'>
                {this.renderAplicativos()}
            </div>
        </div>;
    }

    renderAplicativos() {
        const aplicativos = this.props.aplicativos;

        if (!aplicativos) {
            return <h4 className='info'>
                Inclua aplicativos para começar
            </h4>;
        } else {
            const children = [];

            for (const key in aplicativos) {
                if (key !== '.key') {
                    const aplicativo = aplicativos[key];
                    aplicativo.key = key;

                    children.push(
                        <AppCard {...aplicativo} key={key}/>
                    );
                }
            }

            return children;
        }
    }
}

AppGrid.propTypes = {
    aplicativos: PropTypes.array.isRequired,
};
