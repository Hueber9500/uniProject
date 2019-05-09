"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');
var HttpActions = require('./actions/httpActions');

InitializeActions.initApp();
HttpActions.loadConductingInfo();
HttpActions.loadServedClients();

Router.run(routes, function(Handler){
    React.render(<Handler />, document.getElementById('app'));
});

