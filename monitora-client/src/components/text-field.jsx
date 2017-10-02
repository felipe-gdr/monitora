var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="mdl-textfield mdl-js-textfield">
                <input
                    className={"mdl-textfield__input " + this.props.className}
                    type="text"
                    id="sample1"
                    onChange={this.handleInputChanged}/>
                <label
                    className="mdl-textfield__label"
                    htmlFor="sample1">
                    {this.props.nome}
                </label>
            </div>
        );
    },
    handleInputChanged: function (event) {
        this.props.onTextChanged(event.target.value);
    }
});
