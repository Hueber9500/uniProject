"use strict";

var React = require('react');
var AuthorList = require('./authorList');
var Router = require('react-router');
var Link = Router.Link;
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');

var Authors = React.createClass({
    getInitialState: function(){
        var obj = {
            authors: AuthorStore.getAllAuthors()
        };
        console.log("getinitial state authors", obj);

        return obj;
    },
    
    componentWillMount: function(){
        AuthorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function(){
        console.log('componentWillUnmount in author page');
        AuthorStore.removeChangeListener(this._onChange);
    },

    _onChange: function(){
        //debugger;
        this.setState({authors: AuthorStore.getAllAuthors()});
    },

    render: function(){
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-primary btn-lg">Add Author</Link>
                <AuthorList authors={this.state.authors}/>
            </div>
        );
    }
});

module.exports = Authors;