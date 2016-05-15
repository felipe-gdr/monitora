var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="showbox">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" stroke-miterlimit="10"/>
          </svg>
        </div>
      </div>
    );
  }
});
