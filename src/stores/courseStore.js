"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var Utils = require('../utils');

var _courses = [];

var CourseStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    getAllCourses: function(){
        return Utils._clone(_courses);
    },
    getCourseById: function(id){
        return _.find(this.getAllCourses(), {id: id});
    }
});

Dispatcher.register(function(action){
    switch(action.actionType){
        case ActionTypes.INITIALIZE:{
            _courses = action.initialData.courses;
            CourseStore.emitChange();
            break;
        }
        case ActionTypes.CREATE_COURSE:{
            _courses.push(action.course);
            CourseStore.emitChange();
            break;
        }
        case ActionTypes.UPDATE_COURSE:{
            console.log("update course", action.course);
            var courseIndex = _.indexOf(_courses, _.find(_courses, {id: action.course.id}));
            _courses.splice(courseIndex, 1, action.course);
            CourseStore.emitChange();
            break;
        }
        case ActionTypes.DELETE_COURSE:{
            _.remove(_courses, function(course){
                return course.id === action.id;
            });
            CourseStore.emitChange();
            break;
        }
        default:{
            console.log('in course store nothing to do for action type', action.actionType);
            // nothing to do
        }
    }
});

module.exports = CourseStore;