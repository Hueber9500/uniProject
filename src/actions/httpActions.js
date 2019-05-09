"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var axios = require('axios');

var url = 'http://sbdoop-test.eu-central-1.elasticbeanstalk.com/';

var HttpActions = {
    loadConductingInfo: function(){        
        axios.get(url + 'sbd')
        .then(function(response){
            Dispatcher.dispatch({
                actionType: ActionTypes.LOAD_CONDUCTING_INFO,
                data: response.data
            });
        });
    },

    loadServedClients: function(){
        axios.get(url + 'oop')
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.LOAD_ALL_DATA,
                    data: response.data
                });
        });
    },

    loadServedClientsByNamePromise: function(name){
        return axios.get(url + 'oop/served_clients?name=' + name);
    },

    loadTotalTimeServedClientsByNamePromise: function(name){
        return axios.get(url + 'oop/served_clients_time?name=' + name);
    },

    loadServedClientsByName: function(name){
        axios.get(url + 'oop/served_clients?name=' + name)
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.LOAD_SERVED_CLIENTS_BY_NAME,
                    data: response.data
                });
            });
    },
    loadTotalTimeServedClientsByName: function(name){
        axios.get(url + 'oop/served_clients_time?name=' + name)
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.LOAD_TOTAL_TIME_SERVED_CLIENTS_BY_NAME,
                    data: response.data
                });
            });
    }
};

module.exports = HttpActions;