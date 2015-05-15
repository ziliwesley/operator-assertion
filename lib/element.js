/**
 * Element module
 * See: [element](http://docs.mongodb.org/manual/reference/operator/query/#elment)
 */

//
// Module Dependencies
// --------------------------------------------------

var _        = require('lodash');
var dateUtil = require('date-utils');
var util     = require('util');

//
// Declaration
// --------------------------------------------------

var ext = {};

var extTypes = {};

var typePattern = /^([^\(\)]+)\((.+)\)$/;

//
// Inner Functions
// --------------------------------------------------

/**
 * Check if value matches a specified extensive (custom) type.
 * @param  {Object}  val         Actual value
 * @param  {string}  pattern     Type pattern
 * @return {boolean}             If is matched
 */
function testExtType(val, pattern) {
    var matches = typePattern.exec(pattern);

    if (matches && _.has(extTypes, matches[1])) {
        return extTypes[matches[1]].validate(val, matches[2]);
    } else {
        throw new Error('Unrecognizable type: ' + matches[1]);
    }
}

/**
 * Check if value matches a specified type or pattern.
 * @param  {Object}  val         Actual value
 * @param  {string}  type        Type name
 * @return {boolean}             If is matched
 */
function checkType(val, type) {
    var pass = false;
    var found = true;
    switch (type.toLowerCase()) {
        case 'string':
            return _.isString(val);
        case 'number':
            return _.isNumber(val);
        case 'array':
            return _.isArray(val);
        case 'object':
            return _.isObject(val);
        default:
            return testExtType(val, type);
    }
}

// 
// Extensive types
// --------------------------------------------------

extTypes.Date = {
    validate: function (a, pattern) {
        return new Date(a).toFormat(pattern) === a;
    }
};

extTypes.Timestamp = {
    validate: function (a, pattern) {
        return Date.now().toFormat(pattern) === a;
    }
};

extTypes.ChineseChars = {
    validate: function (a, pattern) {
        var regExp = new RegExp(
            util.format('^[\u4e00-\u9fa5]{%s}$', pattern));
        return regExp.test(a);
    }
};

//
// Extend operator
// --------------------------------------------------

ext.$exists = function (a, e) {
    return a.hasOwnProperty(e);
};

ext.$type = function (a, e) {
    return checkType(a, e);
};

//
// Module Dependencies
// --------------------------------------------------

module.exports = function (operator) {
    operator.extend(ext);
};
