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

ext.$eq = function (a, e) {
    return a === e;
};

ext.$gte = function (a, e) {
    return a >= e;
};

ext.$gt = function (a, e) {
    return a > e;
};

ext.$lte = function (a, e) {
    return a <= e;
};

ext.$lt = function (a, e) {
    return a < e;
};

ext.$ne = function (a, e) {
    return a != e;
};

ext.$in = function (a, e) {
    return e.indexOf(a) > -1;
};

ext.$nin = function (a, e) {
    return e.indexOf(a) === -1;
};

//
// Module Dependencies
// --------------------------------------------------

module.exports = function (operator) {
    operator.extend(ext);
};
