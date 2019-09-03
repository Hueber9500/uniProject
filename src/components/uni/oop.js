"use strict";

var React = require('react');
var UniStore = require('../../stores/uniStore');
var HttpActions = require('../../actions/httpActions');
var Router = require('react-router');
var toastr = require('toastr');
var Link = Router.Link;

var OOP = React.createClass({
    getInitialState: function(){
        console.log('get intial state of oop component', UniStore.getServedClients());
        return {
            data: UniStore.getServedClients()
        };
    },
    componentWillMount: function(){
        UniStore.addChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState({data: UniStore.getServedClients()});
    },

    componentWillUnmount: function(){
        UniStore.removeChangeListener(this._onChange);
        HttpActions.loadServedClients();
    },

    callApiMethods: function(name, event){
        event.preventDefault();

        HttpActions.loadServedClientsByNamePromise(name)
            .then(function(response){
                toastr.success('Seller ' + name + ' has served ' + response.data + ' clients');
            });

        HttpActions.loadTotalTimeServedClientsByNamePromise(name)
            .then(function(response){
                toastr.success('Seller ' + name + ' has ' + response.data + ' minutes total time serving clients');
            });
    },

    delete: function(id, event){
        event.preventDefault();

        HttpActions.deletePromise(id)
            .then(function(response){
                HttpActions.loadServedClients();
                toastr.success('row deleted');
                });     
    },

    render: function(){
        var mapRow = function(data){
            return (
            <tr>
                <td><a href="#" onClick = {this.delete.bind(this, data.id)}>Delete</a></td>
                <td><a href="#" onClick = {this.callApiMethods.bind(this, data.seller)}>{data.seller}</a></td>
                <td>{data.client}</td>
                <td>{data.minutes}</td>
            </tr> );
        };

        return (
            <div>
                <h1>OOP 2 component</h1>
                <Link className="btn btn-default" to="addRow">Add</Link>
                <table className="table">
                <thead>
                    <th></th>
                    <th>Seller</th>
                    <th>Client</th>
                    <th>Working time</th>
                </thead>
                <tbody>
                    {this.state.data.map(mapRow, this)}
                </tbody>
                </table>
            </div>
        );
    }
});

module.exports = OOP;