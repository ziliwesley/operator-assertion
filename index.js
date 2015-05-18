//
// Module Dependencies
// --------------------------------------------------

var core       = require('./lib/core');
var comparison = require('./lib/comparison');
var element    = require('./lib/element');
var evaluation = require('./lib/evaluation');

// 
// Extend core
// --------------------------------------------------

comparison(core);
element(core);
evaluation(core);

//
// Module Dependencies
// --------------------------------------------------

module.exports = core;
