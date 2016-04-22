var React = require('react');

module.exports = React.createClass({
  render: function () {
    return <div >
      Detalhe: {this.props.params.app}!
    </div>
  }
});
