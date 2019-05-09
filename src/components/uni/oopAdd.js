"use strict";

var React = require('react');
var Router = require('react-router');
var HttpActions = require('../../actions/httpActions');
var TextInput = require('../common/textInput');
var toastr = require('toastr');

var OOPAdd = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function(){
        return {
            row: {
            seller: "",
            client: "",
            minutes: ""},
        errors: {}
    };
    },

    setRowState: function(event){
        var field = event.target.name;
        var value = event.target.value;
        this.state.row[field] = value;

        return this.setState({row: this.state.row});
    },

    onSave: function(event){
        event.preventDefault();

        HttpActions.addPromise(this.state.row)
            .then(function(resp){
        HttpActions.loadServedClientsPromise()
        .then(function(response){
            toastr.success('Row saved.');           
        });      
    });
        this.transitionTo('oop');
    },

    render: function(){
        return (
            <form>
                <TextInput 
                    name="seller" 
                    label="Seller" 
                    value={this.state.row.seller} 
                    onChange = {this.setRowState} 
                    error={this.state.errors.seller}/>
                <TextInput 
                    name="client" 
                    label="Client" 
                    value={this.state.row.client}
                    onChange = {this.setRowState} 
                    error={this.state.errors.client}/>
                <TextInput 
                    name="minutes" 
                    label="Working Minutes" 
                    value={this.state.row.minutes}
                    onChange = {this.setRowState} 
                    error={this.state.errors.minutes}/>
                <div className="form-group row">
                    <div className="col-md-2">
                        <input type="submit" value="Save" className="btn btn-default" onClick={this.onSave}/>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = OOPAdd;