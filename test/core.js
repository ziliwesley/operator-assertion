//
// Module Dependencies
// --------------------------------------------------

var should = require('should');

//
// Test suite
// --------------------------------------------------

describe('operator', function () {
    var op;

    it('Core should be load', function () {
        op = require('../lib/core.js');
    });

    it('#extend({ \'$double\', fn }) should extend the operator with a ' +
        'new assertion method: $double', function () {
        op.extend({
            '$double': function (a, e) {
                return (a === e * 2);
            }
        });

        op.$double.should.be.instanceof(Function);
    });

    it('#assert(2, \'double\', 1) should be true', function () {
        op(2, 'double', 1).should.be.exactly(true);
    });

    it('#assert(2, \'double\', 2) should be false', function () {
        op(2, 'double', 2).should.be.exactly(false);
    });
});
