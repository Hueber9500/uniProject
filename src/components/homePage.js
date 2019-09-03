"use strict";

var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
    render: function(){
        return (<div className="jumbotron">
            <h1>Mario's monitoring service</h1>
        </div>);
    }
});

module.exports = Home;