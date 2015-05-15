//
// Module Dependencies
// --------------------------------------------------

var should = require('should');

//
// Test suite
// --------------------------------------------------

describe('operator::evaluation', function () {
    var op;
    var ext;

    it('Core should be load', function () {
        op = require('../lib/core.js');
    });

    it('Evaluation module should be load', function () {
        ext = require('../lib/evaluation.js');
    });

    it('Evaluation module should extend the core', function () {
        ext(op);
    });

    it('#mod() should perform a modulo operation on the value of a field and ' +
        'match item with a specified result', function () {
        op.$mod(3, [2, 0]).should.be.exactly(false);
        op.$mod(5, [5, 0]).should.be.exactly(true);
    });

    it('#$regex() should return true when values match a specified regular ' +
        'expression', function () {
        op.$regex('534', '\\d{2,5}').should.be.exactly(true);
        op.$regex('67ab1', /\d{2}[a-z]{2}\d{1}/).should.be.exactly(true);
    });

    it('#$where() should match items that satisfy a JavaScript expression', function () {
        var complex = {
            comboA: {
                name: 'comboA',
                id: '_comboA'
            },
            comboB: {
                name: 'comboB',
                id: '_comboB'
            }
        };
        op.$where(complex.comboB, 'this.name === \'comboB\'').should.be.exactly(true);
    });
});
