/**
 * Coparison module
 * See: [comparison](http://docs.mongodb.org/manual/reference/operator/query/#comparison)
 */

//
// Module Dependencies
// --------------------------------------------------

//
// Declaration
// --------------------------------------------------

var ext = {};

//
// Inner Functions
// --------------------------------------------------


//
// Extend operator
// --------------------------------------------------

ext.$eq = function (actual, expectation) {
    return actual === expectation;
};

ext.$gte = function (actual, expectation) {
    return actual >= expectation;
};

ext.$gt = function (actual, expectation) {
    return actual > expectation;
};

ext.$lte = function (actual, expectation) {
    return actual <= expectation;
};

ext.$lt = function (actual, expectation) {
    return actual < expectation;
};

ext.$ne = function (actual, expectation) {
    return actual != expectation;
};

ext.$in = function (actual, expectation) {
    return expectation.indexOf(actual) > -1;
};

ext.$nin = function (actual, expectation) {
    return expectation.indexOf(actual) === -1;
};

ext.$text = function (actual, expectation) {
    return typeof actual === 'string' &&
        actual === expectation;
};

ext.$regex= function (actual, expectation) {
    return (actual instanceof RegExp) ? expectation.test(actual) : 
        new RegExp(expectation).test(actual);
};

//
// Module Dependencies
// --------------------------------------------------

module.exports = function (operator) {
    operator.extend(ext);
};
