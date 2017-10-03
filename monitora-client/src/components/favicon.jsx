import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import faviconUp from '../../public/favicon.ico';
import faviconDown from '../../public/favicon-down.ico';


export default class Favicon extends React.Component {
    getGlobalStatus(apps) {
        // Obtém status dos aplicativos
        let status = _.every(apps, a => a.status === 'up') ? 'up' : 'down';

        // Verifica os status de cada node dos clusters
        status = _.filter(apps, a => a.cluster).reduce((status, a) => {
            return _.every(_.values(a.cluster), c => c.status === 'up') ? status : 'down';
        }, status);

        return status;
    }

    changeFavicon(apps) {
        document.querySelector('link[rel="icon"]').href =
            this.getGlobalStatus(apps) === 'up' ? faviconUp : faviconDown;
    }

    render() {
        this.changeFavicon(this.props.aplicativos);

        return null;
    }
}

Favicon.propTypes = {
    aplicativos: PropTypes.array.isRequired,
};
