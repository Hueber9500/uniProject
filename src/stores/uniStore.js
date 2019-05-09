"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var Utils = require('../utils');

var conductingInfo = {};
var servedClients = {};

var UniStore = assign({}, EventEmitter.prototype, {
    getConductingInfo: function(){
        return Utils._clone(conductingInfo);
    },
    getServedClients: function(){
        return Utils._clone(servedClients);
    }
});

Dispatcher.register(function(action){
    console.log('dispatch in unistore');
    switch(action.actionType){
        case ActionTypes.LOAD_CONDUCTING_INFO :{
            conductingInfo = action.data;
            break;
        }
        case ActionTypes.LOAD_ALL_DATA :{
            servedClients = action.data;
            break;
        }
    }
});

module.exports = UniStore;