"use strict";

var axios = require('axios');

var HttpApi = {
    getConductingInfo: function(){
        console.log('get info with axios');
        var data; 
        axios.get('http://sbdoop-test.eu-central-1.elasticbeanstalk.com/sbd')
            .then(function(res){
                console.log(res.data);               
        });

        console.log('outside prmise');
        return data;
    }
};

module.exports = HttpApi;