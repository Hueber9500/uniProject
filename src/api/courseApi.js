"use strict";

var courses = require('./courseData').courses;
var _ = require('lodash');

var _generateId = function(course){
    return course.title.replace(' ', '-');
};

var _clone = function(item){
    return JSON.parse(JSON.stringify(item));
};

var CourseApi = {
    getAllCourses: function(){
        return _clone(courses);
    },
    getCourseById: function(id){
        var course = _.find(courses, {id: id});
        return _clone(course);
    },
    saveCourse: function(course){
        console.log("CourseApi saveCourse");
        //debugger;
        if(course.id){
            var indexOfCourse = _.findIndex(courses, _.find(courses, {id: course.id}));
            courses.splice(indexOfCourse, 1, course);
        }else{
            course.id = _generateId(course);
            courses.push(_clone(course));
        }

        return _clone(course);
    },
    deleteCourse: function(id){
        _.remove(courses, {id: id});
    }
};

module.exports = CourseApi;