"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
    <Route name = "app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler = {require('./components/homePage')} />
        <Route name="authors" handler = {require('./components/authors/authorPage')} />
        <Route name="authorDetails" path="authors/:id" handler = {require('./components/authors/manageAuthorPage')} />
        <Route name="addAuthor" path="author" handler= {require('./components/authors/manageAuthorPage')} />
        <Route name="about" handler={require('./components/about/aboutPage')} />
        <Route name="test" handler={require('./components/test')} />
        <Route name="courses" handler={require('./components/courses/coursesPage')} />
        <Route name="course" path ="courses/:id" handler={require('./components/courses/courseAddEdit')} />
        <Route name="addCourse" handler={require('./components/courses/courseAddEdit')} />
        <NotFoundRoute handler={require('./components/notFoundPage')} />
        <Redirect from="about-us" to = "about" />
        <Redirect from="awthurs" to="authors" />
        <Redirect from="about/*" to = "about" />

        <Route name="sbd" handler={require('./components/uni/sbd')} />
        <Route name="oop" handler={require('./components/uni/oop')} />
        <Route name="addRow" handler={require('./components/uni/oopAdd')} />
    </Route>
);

module.exports = routes;