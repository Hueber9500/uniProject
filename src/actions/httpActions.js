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

    delete: function(id){
        axios.delete(url + 'oop/' + id)
            .then(function(response){
                Dispatcher.dispatch({
                    actionType: ActionTypes.DELETE_OOP
                });
            });
    },

    deletePromise: function(id){
        return axios.delete(url + 'oop/' + id);
    },

    update: function(id, oopRow){
        axios.put(url + 'oop/' + id, {
            seller: oopRow.seller,
            client: oopRow.client,
            minutes: oopRow.minutes
        }).then(function(response){
            Dispatcher.dispatch({
                actionType: ActionTypes.UPDATE_OOP
            });
        });
    },

    add: function(oopRow){
        var destinationUrl = url + 'oop';
        console.log('add row', oopRow, destinationUrl);
        axios({
            method: 'post',
            url: destinationUrl,
            headers: {},
            data: {
                seller: oopRow.seller,
                client: oopRow.client,
                minutes: oopRow.minutes
            }
        }).then(function(response){
            Dispatcher.dispatch({
                actionType: ActionTypes.CREATE_OOP
            });
        });
    },

    addPromise: function(oopRow){
        var destinationUrl = url + 'oop';
        console.log('add row', oopRow, destinationUrl);
        return axios({
            method: 'post',
            url: destinationUrl,
            headers: {},
            data: {
                seller: oopRow.seller,
                client: oopRow.client,
                minutes: oopRow.minutes
            }
        }).then(function(response){
            Dispatcher.dispatch({
                actionType: ActionTypes.CREATE_OOP
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

    loadServedClientsPromise: function(){
        return axios.get(url + 'oop')
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