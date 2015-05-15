//
// Module Dependencies
// --------------------------------------------------

var should = require('should');

//
// Test suite
// --------------------------------------------------

describe('operator::comparison', function () {
    var op;
    var ext;

    it('Core should be load', function () {
        op = require('../lib/core.js');
    });

    it('Comparison module should be load', function () {
        ext = require('../lib/comparison.js');
    });

    it('Comparison module should extend the core', function () {
        ext(op);
    });

    it('#eq() should matches values that are equal to a specified value', function () {
        op.$eq(5, 4).should.be.exactly(false);
        op.$eq(5.00, 5).should.be.exactly(true);
        op.$eq(4.00, 4.00).should.be.exactly(true);
    });

    it('#$gt() should matches values that are greater than a specified value', function () {
        op.$gt(5, 4).should.be.exactly(true);
        op.$gt(5.00, 5).should.be.exactly(false);
        op.$gt(4.00, 5).should.be.exactly(false);
    });

    it('#$gte() should matches values that are greater than or equal to a specified value', function () {
        op.$gte(5, 4).should.be.exactly(true);
        op.$gte(5.00, 5).should.be.exactly(true);
        op.$gte(4.00, 5).should.be.exactly(false);
    });

    it('#$lt() should matches values that are less than a specified value', function () {
        op.$lt(5, 4).should.be.exactly(false);
        op.$lt(5.00, 5).should.be.exactly(false);
        op.$lt(4.00, 5).should.be.exactly(true);
    });

    it('#$lte() should matches values that are less than or equal to a specified value', function () {
        op.$lte(5, 4).should.be.exactly(false);
        op.$lte(5.00, 5).should.be.exactly(true);
        op.$lte(4.00, 5).should.be.exactly(true);
    });

    it('#$ne() should matches all values that are not equal to a specified value', function () {
        op.$ne(5, 4).should.be.exactly(true);
        op.$ne(5.00, 5).should.be.exactly(false);
        op.$ne(5, 5).should.be.exactly(false);
        op.$ne(4.00, 5).should.be.exactly(true);
    });

    it('#$in() should matches any of the values specified in an array', function () {
        op.$in('A', [ 'A', 5, 'B', 'C' ]).should.be.exactly(true);
        op.$in('D', [ 'A', 5, 'B', 'C' ]).should.be.exactly(false);
    });

    it('#$nin() should matches none of the values specified in an array', function () {
        op.$nin('A', [ 'A', 5, 'B', 'C' ]).should.be.exactly(false);
        op.$nin('D', [ 'A', 5, 'B', 'C' ]).should.be.exactly(true);
    });
});
