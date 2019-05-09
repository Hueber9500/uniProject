"use strict";

var Utils = {
    _clone: function(obj){
        return JSON.parse(JSON.stringify(obj));
    }
};

module.exports = Utils;