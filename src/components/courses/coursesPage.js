"use strict";

var React = require('react');
var CourseList = require('./courseList');
var Link = require('react-router').Link;
var CourseStore = require('../../stores/courseStore');

var Courses = React.createClass({
    getInitialState: function(){
        console.log("course page", "getInitialState", CourseStore.getAllCourses());
        return {
            courses: CourseStore.getAllCourses()
        };
    },
    componentWillMount: function(){
        CourseStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function(){
        CourseStore.removeChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState({courses: CourseStore.getAllCourses()});
    },

    render: function(){
        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-primary btn-lg">Add Course</Link>
                <CourseList courses = {this.state.courses}/>  
            </div>           
        );
    }
});

module.exports = Courses;