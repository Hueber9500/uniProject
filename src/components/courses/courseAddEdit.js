"use strict";

var React = require('react');
var CourseStore = require('../../stores/courseStore');
var CourseForm = require('./courseForm');
var AuthorStore = require('../../stores/authorStore');
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');
var Router = require('react-router');

var ManageCourse = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function(){
        console.log('Initializing state in course add edit');
        var initialState = {
            course: {id: '', title: '', watchHref: '', author: {id: '', name: ''}, length: '', category: ''},
            errors: {},
            isDirty: false
        };

        console.log("initial state: ", initialState);
        return initialState;
    },
    componentWillMount: function(){
        var courseId = this.props.params.id;

        if(courseId){
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },
    setCourseState: function(event){
        var field = event.target.name;
        var value = event.target.value;
        if(field === "author"){
            var author = AuthorStore.getAuthorById(value);
            value = {
                id: value,
                name: author.firstName + " " + author.lastName
            };
        }
        this.state.course[field] = value;

        return this.setState({course: this.state.course});
    },
    isFormValid: function(){
        var valid = true;

        if(this.state.course.title.length < 3){
            this.state.errors.title = "Title is short";
        }

        if(this.state.errors.title){
            valid = false;
        }

        this.setState({errors: this.state.errors});
        return valid;
    },
    saveCourse: function(event){
        console.log("saveCourse", event);
        event.preventDefault();

        if(!this.isFormValid()){
            return;
        }
        
        if(this.state.course.id){
            CourseActions.updateCourse(this.state.course);
        }else{
            CourseActions.createCourse(this.state.course);
        }

        toastr.success('Course saved');
        this.transitionTo('courses');
    },
    render: function(){
        console.log(this.state, this.state.errors);
        return (
            <div>
                <h1>Course Page</h1>
                <CourseForm 
                    course = {this.state.course} 
                    onChange ={this.setCourseState} 
                    onSave = {this.saveCourse}
                    errors = {this.state.errors} />
            </div>);
    }
});

module.exports = ManageCourse;