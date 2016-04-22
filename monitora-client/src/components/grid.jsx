var React = require('react');
var Card = require('./card');

module.exports = React.createClass({
  render: function() {
    return <div className="app-grid">
      <div className="mdl-grid">
        {this.renderAplicativos()}
      </div>
    </div>
  },
  renderAplicativos: function() {
    var aplicativos = this.props.aplicativos;

    if(!aplicativos) {
      return <h4>
        Inclua aplicativos para começar
      </h4>
    } else {
      var children = [];

      for(var key in aplicativos) {
        if(key != '.key') {
          var aplicativo = aplicativos[key];
          aplicativo.key = key;

          children.push(
            <Card {...aplicativo} key={key}/>
          );
        }
      }

      return children;
    }
  }
});
