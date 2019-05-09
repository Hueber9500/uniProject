"use strict";

var React = require('react');
var AuthorStore = require('../../stores/authorStore');

var SelectItem = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        return {
            authors: []
        };
    },
    componentWillMount: function(){
        this.setState({authors: AuthorStore.getAllAuthors()});
    },

    render: function(){
        var authorToOption = function(author){
            return (
                <option key={author.id} value={author.id}>{author.firstName} {author.lastName}</option>
            );  
        };

        return (
            <div className='form-group'>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className='field'>
                    <select className = "form-control"
                    name = {this.props.name}
                    onChange = {this.props.onChange}
                    ref = {this.props.name}
                    value = {this.props.id}>
                        {this.state.authors.map(authorToOption, this)}
                    </select>
                </div>
            </div>
        );
    }
});

module.exports = SelectItem;