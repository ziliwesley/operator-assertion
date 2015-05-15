//
// Module Dependencies
// --------------------------------------------------

var core       = require('./lib/core');
var comparison = require('./lib/comparison');
var element    = require('./lib/element');

// 
// Extend core
// --------------------------------------------------

comparison(core);
element(core);

//
// Module Dependencies
// --------------------------------------------------

module.exports = core;