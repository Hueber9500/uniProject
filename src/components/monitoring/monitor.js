"use strict";

var React = require('react');
var signalR = require('@aspnet/signalr');
var HttpActions = require('../../actions/httpActions');
var MonitorStore = require('../../stores/monitoringStore');

var Monitor = React.createClass({
    getInitialState: function(){
        console.log('getInitialState');
        return {
            connection: {},
            employees: MonitorStore.getArrivedEmployees(),
            buttonDisabled: false
        };
    },

    componentDidMount: function(){
        var hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://192.168.0.247:5920/monitoring")
        .configureLogging(signalR.LogLevel.Information)
        .build();

        this.setState({connection: hubConnection});
    },

    componentWillMount: function(){
        MonitorStore.addChangeListener(this._onChange);
    },

    _onChange: function(){
        this.setState({employees: MonitorStore.getArrivedEmployees()});
    },

    componentWillUnmount: function(){
        MonitorStore.removeChangeListener(this._onChange);
    },

    connect: function(){
        var self = this;

        this.state.connection.on('Send', function(json){     
            console.log(json);

            HttpActions.employeesArrival(JSON.parse(json));
        });

        this.state.connection.start().then(function()
        {   
            var url = self.state.connection.connection.transport.webSocket.url;           
            var connectionId = url.split('?id=')[1];

            self.setState({buttonDisabled: true});
            console.log('successful connection');

            HttpActions.connectToMonitoringService(connectionId);
        }, function(){
            console.log('error');
        });
    },

    render: function(){
        var mapRow = function(employee){
            return (
                <tr>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.when}</td>
                </tr>
            );
        };

        return (
            <div className="container-fluid">
            
            <input disabled = {this.state.buttonDisabled} type="button" onClick={this.connect} value='Connect to monitoring service'/>

                <h1>Arriving employees</h1>
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
            </div>
        );
    }
});

module.exports = Monitor;