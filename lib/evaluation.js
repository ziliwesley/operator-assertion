/**
 * Evaluation module
 * See: [evaluation](http://docs.mongodb.org/manual/reference/operator/query/#evaluation)
 */

//
// Module Dependencies
// --------------------------------------------------

var _  = require('lodash');

//
// Declaration
// --------------------------------------------------

var ext = {};

var typePattern = /^([^\(\)]+)\((.+)\)$/;

//
// Inner Functions
// --------------------------------------------------


//
// Extend operator
// --------------------------------------------------

ext.$mod = function (a, e) {
    if (_.isArray(e) && e.length === 2) {
        return a % e[0] === e[1];
    } else {
        throw new Error('operator.$mod() expects arg #2 to be an array of two numbers');
    }
};


ext.$text = function (a, e) {
    return typeof a === 'string' &&
        a === e;
};

ext.$regex= function (a, e) {
    return (a instanceof RegExp) ? e.test(a) : 
        new RegExp(e).test(a);
};

ext.$where = function (a, e) {
    /* jshint evil: true */
    var fn;
    if (_.isString(e)) {
        return new Function('return ' + e).call(a);
    } else {
        throw new TypeError('operator.$where() expects arg #2 to be an ' +
            'string, ' + (typeof e) + ' got.');
    }
};

//
// Module Dependencies
// --------------------------------------------------

module.exports = function (operator) {
    operator.extend(ext);
};
