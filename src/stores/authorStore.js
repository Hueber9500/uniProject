"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var Utils = require('../utils');

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    getAllAuthors: function(){
        return Utils._clone(_authors);
    },
    getAuthorById: function(id){
        return _.find(this.getAllAuthors(), {id: id});
    }
});

Dispatcher.register(function(action){
    console.log("author store received " + action.actionType);
    switch(action.actionType){
        case ActionTypes.INITIALIZE:{
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        }
        case ActionTypes.CREATE_AUTHOR:{
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        }
        case ActionTypes.UPDATE_AUTHOR:{
            var existingAuthor = _.find(_authors, {id: action.author.id});
            var exisintAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(exisintAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
            break;
        }
        case ActionTypes.DELETE_AUTHOR:{
            //debugger;
            _.remove(_authors, function(author){
                return author.id === action.id;
            });
            AuthorStore.emitChange();
            break;
        }
        default:{
            console.log('in author store nothing to do for action type', action.actionType);
            // nothing to do
        }
    }
});

module.exports = AuthorStore;