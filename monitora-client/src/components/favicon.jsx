var React = require('react');
var _ = require('lodash')

var faviconUp = require('../../public/favicon.ico');
var faviconDown = require('../../public/favicon-down.ico');


module.exports = React.createClass({
	getGlobalStatus: function(apps) {
		// Obtém status dos aplicativos
		var status = _.every(apps, a => a.status === 'up') ? 'up' : 'down'

		// Verifica os status de cada node dos clusters
		status = _.filter(apps, a => a.cluster).reduce((status, a) => {
			return _.every(_.values(a.cluster), c => c.status === 'up') ? status : 'down'
		}, status)

		return status
	},

	changeFavicon: function(apps) {
		document.querySelector('link[rel="icon"]').href = 
			this.getGlobalStatus(apps) === 'up' ? faviconUp : faviconDown
	},
 
	render: function() {
		this.changeFavicon(this.props.aplicativos)

		return null
	}
})