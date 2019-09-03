"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var HttpActions = require('./actions/httpActions');

// HttpActions.loadConductingInfo();
// HttpActions.loadServedClients();
HttpActions.loadEmployeeArrivalHistory({page: 1, pageSize: 10});

Router.run(routes, function(Handler){
    console.log("In main js");
    React.render(<Handler />, document.getElementById('app'));
});

