"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var Utils = require('../utils');

var arrivedEmployees = [];

var MonitoringStore = assign({}, EventEmitter.prototype, {
    getArrivedEmployees: function(){
        return Utils._clone(arrivedEmployees);
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    }
});

Dispatcher.register(function(action){
    console.log('dispatch in monitoring store');
    switch(action.actionType){
        case ActionTypes.LOAD_EMPLOYEE_ARRIVAL :{
            Array.prototype.push.apply(arrivedEmployees, action.data);
            MonitoringStore.emitChange();
            break;
        }
        default:{
            console.log('not registered action for this action type');
        }
    }
});

module.exports = MonitoringStore;