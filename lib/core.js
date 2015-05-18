//
// Module Dependencies
// --------------------------------------------------

var _ = require('lodash');

//
// Declaration
// --------------------------------------------------

var version = '0.2.1';

var operatorPattern = /^\$.+$/;

//
// Inner Functions
// --------------------------------------------------

/**
 * Walk expectaion definition tree recursively
 * @param  {Object} a      Object contains actual values
 * @param  {Object} e      Object contains expectation definitions
 * @return {[type]}        [description]
 */
function walk(a, e) {
    var isPassed = true;
    var hasOperator = false;

    _.each(e, function (item, key) {
        if (operatorPattern.test(key)) {
            isPassed = isPassed && operator.assert(a, key, e[key]);
        } else {
            if (_.isObject(item)) {
                isPassed = isPassed && walk(a[key], e[key]);
            } else {
                // console.log(operator.assert(a[key], 'eq', e[key]), a[key], e[key]);
                isPassed = isPassed && operator.assert(a[key], 'eq', e[key]);
            }
        }        
    });

    return isPassed;
}

//
// Class definitions
// --------------------------------------------------

/**
 * Main function of operator, map to operator.assert().
 * @param {Object} a  Actual value
 * @param {string} op Id of the operator, start with `$` sign.
 * @param {Object} e  Value / pattern of expectation
 */
function operator(a, op, e) {
    // Call the constructor of Operator
    return operator.assert(a, op, e);
}

//
// Module Exports
// --------------------------------------------------

operator.assert = function (a, op, e) {
    var opId = (op[0] === '$')?
            op : '$' + op;

    if (operator.hasOwnProperty(opId)) {
        return operator[opId].call(operator, a, e);
    } else {
        throw new Error('Unrecognizable operator: ' + opId);
    }
};

operator.extend = function (ext) {

    if (typeof ext !== 'object') {
        throw new TypeError('Expect arg #1 to be an object, ' +
            (typeof ext) + ' got.');
    }

    Object.keys(ext).forEach(function (opId) {
        var validateFn;
        var fn = ext[opId];

        if (operatorPattern.test(opId)) {
            validateFn = ext[opId];
        } else {
            throw new Error('Expect a proper operator name: ' + opId);
        }

        if (typeof validateFn === 'function') {
            operator[opId] = fn;
        } else {
            throw new TypeError('Expect a function as validator, ' + 
                (typeof fn) + ' got.');
        }
    });
};

operator.test = function (a, e) {
    return walk(a, e);
};


module.exports = operator;
