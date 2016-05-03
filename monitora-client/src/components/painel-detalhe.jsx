var React = require('react');


module.exports = React.createClass({
  render: function() {
    return <div className="painel-detalhe">
      <div className="mdl-card mdl-shadow--2dp">
        <div className={"mdl-card__title mdl-card--expand status-" + this.props.status } >
          {this.props.children}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          {this.props.rodape}
        </div>
      </div>
    </div>
  }
});
