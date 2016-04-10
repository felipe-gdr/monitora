var React = require('react');
var Moment = require('moment');

module.exports = React.createClass({
  componentWillMount: function() {
    setInterval(function() {
      this.forceUpdate();
    }.bind(this), 10000);
  },
  render: function() {
    if(!this.props.dataUltimaAtualizacao) {
      return <div>desconhecido</div>;
    }

    return <div className="atualizacao-display">
      Última atualização: {new Moment(this.props.dataUltimaAtualizacao).fromNow()}
    </div>

  }
});
