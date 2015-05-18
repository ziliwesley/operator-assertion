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
        op = require('../index');
    });

    it('#test({ now: { temp: 12 }, code: \'010\',name: \'北京\' }, { now: { temp: { $gte: ' +
        '-50, $lte: 150 }, name: { $type: \'ChineseChars(2,)\' } } }) should be true', function () {
        op.test({
            now: {
                temp: 12
            },
            code: '010',
            name: '北京'
        }, {
            now: {
                temp: {
                    $gte: -50,
                    $lte: 150
                }
            },
            name: {
                $type: 'ChineseChars(2,)'
            },
            code: '010'
        }).should.be.exactly(true);
    });

    it('#test({ now: { temp: 12 }, code: \'010\',name: \'北京\' }, { now: { temp: { $gte: ' +
        '-50, $lte: 150 }, name: { $type: \'ChineseChars(1)\' } } }) should throw an Error', function () {
        (function () {
            op.test({
                now: {
                    temp: 12
                },
                code: '010',
                name: '北京'
            }, {
                now: {
                    temp: {
                        $gte: -50,
                        $lte: 150
                    }
                },
                name: {
                    $type: 'ChineseChars(1)'
                },
                code: '010'
            });
        }).should.throw(Error);
    });
});
