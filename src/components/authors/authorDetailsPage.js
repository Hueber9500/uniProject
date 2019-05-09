"use strict";

var React = require('react');
var Link = require('react-router').Link;

var AuthorDetailsPage = React.createClass({
    render: function(){
        return (
            <div>
                <h1>{this.props.params.id}</h1>
                <Link to="authors" className="btn btn-primary btn-lg">Authors</Link>
            </div>
        );
    }
});

module.exports = AuthorDetailsPage;