"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var SelectItem = require('../common/selectItem');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,  
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },
    render: function(){
        return (
            <form>
                <TextInput 
                    name = "title"
                    label = "Title"
                    value = {this.props.course.title}
                    onChange = {this.props.onChange}
                    error = {this.props.errors.title} />
                <TextInput 
                    name = "category"
                    label = "Category"
                    value = {this.props.course.category}
                    onChange = {this.props.onChange}
                    error = {this.props.errors.category} />
                <SelectItem 
                    id = {this.props.course.author.id} 
                    name = "author" 
                    label = "Author"
                    onChange = {this.props.onChange} />
                <TextInput 
                    name = "watchHref"
                    label = "Link"
                    value = {this.props.course.watchHref}
                    onChange = {this.props.onChange}
                    error = {this.props.errors.watchHref} />
                <TextInput
                    name="length"
                    label="Length"
                    value = {this.props.course.length}
                    onChange = {this.props.onChange}
                    error = {this.props.errors.length} />
                <div className="form-group row">
                    <div className="col-md-2">
                        <input type="submit" className="btn btn-default" value="Save" onClick={this.props.onSave}/>
                    </div>
                </div>
                </form>
        );
    }
});

module.exports = CourseForm;