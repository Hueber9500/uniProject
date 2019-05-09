"use strict";

var React = require('react');
var UnitStore = require('../../stores/uniStore');
var HttpActions = require('../../actions/httpActions');
var Router = require('react-router');

var Conducting = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function(){
        console.log('get intial state of sbd component');
        return {
            info: UnitStore.getConductingInfo()
        };
    },

    componentWillUnmount: function(){
        console.log('unmount sbd component');
        HttpActions.loadConductingInfo();
    },

    componentWillMount: function(){
        console.log('component will mount sbd compoennt', this.state.info);
        if(Object.keys(this.state.info).length === 0 && this.state.info.constructor === Object){
            this.transitionTo('app');
        }
    },

    render: function(){
        console.log(this.state.info);

        var mapAuthorToTableRow = function(row){
            return (
                <tr>
                    <td>{row.day}</td>
                    <td>{row.start_time}</td>
                    <td>{row.discipline}</td>
                    <td>{row.teacher}</td>
                    <td>{row.hall}</td>
                    <td>{row.group}</td>
                    <td>{row.exercise_type}</td>
                </tr>
            );
        };

        console.log("in render of sbd component", this.state.info);
        return (
            <div>
            <h1>University schedule</h1>
            <div>
                <table className="table">
                <thead>
                    <th>Day</th>
                    <th>Start time</th>
                    <th>Discipline</th>
                    <th>Teacher</th>
                    <th>Hall</th>
                    <th>Group</th>
                    <th>Exercise type</th>
                </thead>
                <tbody>
                    {this.state.info.map(mapAuthorToTableRow, this)}
                </tbody>
                </table>
            </div>
            </div>
        );
    }
});

module.exports = Conducting;