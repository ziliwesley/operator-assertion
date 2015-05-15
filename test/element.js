//
// Module Dependencies
// --------------------------------------------------

var should = require('should');

//
// Test suite
// --------------------------------------------------

describe('operator::element', function () {
    var op;
    var ext;

    it('Core should be load', function () {
        op = require('../lib/core.js');
    });

    it('Element module should be load', function () {
        ext = require('../lib/element.js');
    });

    it('Element module should extend the core', function () {
        ext(op);
    });

    it('#exists() should matches documents that have the specified field', function () {
        op.$exists({
            name: 'john'
        }, 'name').should.be.exactly(true);

        op.$exists({
            name: 'john'
        }, 'age').should.be.exactly(false);
    });

    it('#$type(\'hello\', \'String\') should be true', function () {
        op.$type('hello', 'String').should.be.exactly(true);
    });

    it('#$type(15, \'Number\') should be true', function () {
        op.$type(15, 'Number').should.be.exactly(true);
    });

    it('#$type([1, 2, 3], \'Array\') should be true', function () {
        op.$type([ 1, 2, 3 ], 'array').should.be.exactly(true);
    });

    it('#$type({}, \'Object\') should be true', function () {
        op.$type({}, 'object').should.be.exactly(true);
    });

    it('#$type(\'2013-02-29\', \'Date(YYYY-MM-DD)\') should be false', function () {
        op.$type('2013-02-29', 'Date(YYYY-MM-DD)').should.be.exactly(false);
    });

    it('#$type(\'2013-02-27\', \'Date(YYYY-MM-DD)\')) should be true', function () {
        op.$type('2013-02-27', 'Date(YYYY-MM-DD)').should.be.exactly(true);
    });

    it('#$type(\'2013-02-27 23:24:57\', \'Date(YYYY-MM-DD HH24:MI:SS)\') should be true', function () {
        op.$type('2013-02-27 23:24:57', 'Date(YYYY-MM-DD HH24:MI:SS)').should.be.exactly(true);
    });

    it('#$type(\'2013-02-27 23:24:57\', \'Date(YYYY-MM-DD HH:MI:SS)\') should be false', function () {
        op.$type('2013-02-27 23:24:57', 'Date(YYYY-MM-DD HH:MI:SS)').should.be.exactly(false);
    });

    it('#$type(\'你们好\', \'ChineseChars(2,5)\') should be true', function () {
        op.$type('你们好', 'ChineseChars(2,5)').should.be.exactly(true);
    });

    it('#$type(\'你好\', \'ChineseChars(2)\') should be true', function () {
        op.$type('你好', 'ChineseChars(2)').should.be.exactly(true);
    });
});
