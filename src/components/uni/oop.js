"use strict";

var React = require('react');
var UniStore = require('../../stores/uniStore');
var HttpActions = require('../../actions/httpActions');
var Router = require('react-router');
var toastr = require('toastr');

var OOP = React.createClass({
    
    getInitialState: function(){
        console.log('get intial state of oop component', UniStore.getServedClients());
        return {
            data: UniStore.getServedClients()
        };
    },

    componentWillUnmount: function(){
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
    render: function(){

        var mapRow = function(data){
            return (
            <tr>
                <td><a href="#" onClick ={this.callApiMethods.bind(this, data.seller)}>{data.seller}</a></td>
                <td>{data.client}</td>
                <td>{data.minutes}</td>
            </tr> );
        };

        console.log("in render of oop component", this.state.data);
        return (
            <div>
                <h1>OOP 2 component</h1>
                <table className="table">
                <thead>
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