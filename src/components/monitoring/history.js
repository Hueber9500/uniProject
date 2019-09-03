"use strict";

var React = require('react');
var HttpActions = require('../../actions/httpActions');
var HistoryStore = require('../../stores/historyStore');
var TextInput = require('../common/textInput');

var History = React.createClass({
    getInitialState: function(){
        var st = {
            employees: HistoryStore.getHistory(),
            meta: HistoryStore.getMetaData(),
            filter: {
                firstName: '',
                surname: ''
            }
        };
        return st;
    },

    setFilterState: function(event){
        var field = event.target.name;
        var value = event.target.value;
        this.state.filter[field] = value;

        return this.setState({filter: this.state.filter});
    },

    componentWillMount: function(){
        HistoryStore.addChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState({employees: HistoryStore.getHistory(), meta: HistoryStore.getMetaData()});
    },

    componentWillUnmount: function(){
        HistoryStore.removeChangeListener(this._onChange);
    },

    connect: function(){
        HttpActions.loadEmployeeArrivalHistory({
                page: this.state.meta.currentPage,
                pageSize: this.state.meta.pageSize,
                firstName: this.state.filter.firstName,
                surname: this.state.filter.surname
            });
    },
    handlePageClick: function(e){
        console.log('handlePageclick', e);
    },
    render: function(){

        var mapRow = function(employee){
            return (
                <tr>
                    <td>{employee.firstName}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.arrivedWhen}</td>
                </tr>
            );
        };

        var mapPage = function(page){
            return (
                <span key={page} onClick = {this.handlePageClick}>{page}</span>
            );
        };

        console.log(this.state.meta);
        var pages = [];
        var classes = 's-btn large-4 columns';

        for(var i = 1; i <= this.state.meta.totalPages; i++){
            pages.push(<span onClick={this.handlePageClick} className={classes}>{i}</span>);
        }

        return (
            <div className="container-fluid">
            <TextInput 
                    name="firstName" 
                    label="First name" 
                    value={this.state.filter.firstName} 
                    onChange = {this.setFilterState} /> 
            <TextInput 
                    name="surname" 
                    label="Surname" 
                    value={this.state.filter.surname} 
                    onChange = {this.setFilterState} /> 

            <input type="button" onClick={this.connect} value='Filter'/>

                <h1>Arrived employees</h1>
                <table className="table">
                <thead>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Arrived at</th>
                </thead>
                <tbody>
                    {this.state.employees.map(mapRow, this)}
                </tbody>
                </table>
                <div className = "row">
                    {pages}
                </div>
            </div>
        );
    }
});

module.exports = History;