var React = require('react');
var _ = require('lodash');

module.exports.List = React.createClass({
    getInitialState: function() {
        return {}
    },
    render: function() {

      return (
        < ul className = "demo-list-icon mdl-list" >
          {this.props.children}
        </ul>
      )
    }
});

module.exports.ListItem = React.createClass({
    render: function() {
        return (
          <li className="mdl-list__item">
            <span className="mdl-list__item-primary-content">
              {
                this.props.icon &&
                <i className="material-icons mdl-list__item-icon">{this.props.icon}</i>
              }
              {this.props.text}
            </span>
          </li>
        )
    }
});
