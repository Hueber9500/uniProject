"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var Utils = require('../utils');

var historyArrivedEmployees = [];
var meta = {};

var HistoryStore = assign({}, EventEmitter.prototype, {
    getHistory: function(){
        return Utils._clone(historyArrivedEmployees);
    },
    getMetaData: function(){
        return Utils._clone(meta);
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
    console.log('dispatch in history store');
    switch(action.actionType){
        case ActionTypes.HISTORY:{
            historyArrivedEmployees = action.data;
            meta = action.meta;
            HistoryStore.emitChange();
            break;
        }
        default:{
            console.log('not registered action for this action type');
        }
    }
});

module.exports = HistoryStore;