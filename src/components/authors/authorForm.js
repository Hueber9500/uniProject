"use strict";

var React = require('react');
var TextInput = require('../common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired,
        errors: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <form>
                <TextInput 
                    name="firstName" 
                    label="First Name" 
                    value={this.props.author.firstName} 
                    onChange = {this.props.onChange} 
                    error={this.props.errors.firstName}/>
                <TextInput 
                    name="lastName" 
                    label="Last Name" 
                    value={this.props.author.lastName}
                    onChange = {this.props.onChange} 
                    error={this.props.errors.lastName}/>
                <div className="form-group row">
                    <div className="col-md-2">
                        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave}/>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = AuthorForm;