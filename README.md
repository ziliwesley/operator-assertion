# Operator-Assertion

> Let you write assertion with mongodb style operators

## Usage

### Using with node.js

```
npm install operator-assertion --save
```

Of course, you can use `cnpm` as an alternative (What is this? Check [`cnpm`](http://npm.taobao.org/) now) to install if you are happened to be living in China, the package will be kept synced.

### Using with browser-based web development

```
bower install operator-assertion --save
```

Well, in the future, but sadly **NOT NOW**...

## How to use

The following codes will show you what it is capable of:

```
var op = require('operator-assertion');

// Basic Comparison
op(1, 'eq', 1.00); // true
op.$lt(2, 4); // true
op.$in('a', [ 'a', 'b', 'c' ]); // true
op.$nin(90, [ 0, 90, 180, 270 ]); // false

// Complex evaluation
op(12, 'mod', [3, 0]); //true
op('abcd', 'regex', '[a-z]{4}'); // true
op('abcde', 'regex', '[a-z]{4}'); // false
op.$where({
    left: 12,
    right: 24
}, 'this.left === this.right / 2'); // true

// Types (with custom Types)
op.$type('hello world', 'String'); // true
op.$type({
    name: 'tony'
}, 'object'); // true
op.$type('汉字', 'ChineseChars(2)'); // true
op.$type('2100-02-29', 'Date(YYYY-MM-DD)'); // false
op.$type('2008-02-29', 'Date(YYYY-MM-DD)'); // true, 2008 is a leap year, but 2100 is not.

// Run test on an object literal
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
}); // true

// However
op.$eq(.06, .01 + .05) // false, it's ironic, but you know **.06 !== .01 + .05** in javascript world.
```

### Summary

```
var op = require('operator-assertion');

// Assertions
// --------------------------------------------------

op.$operator(actual, expectaion);

// or

op(actual, 'operator', expectaion);

// or

op.assert(actual, 'operator', expectaion);

// Test an object literal
// --------------------------------------------------

op.test(actualObject, expectaionSpec);
```

### Coverage of mongodb style operators

Here are operators those are currently supported or planning to be supported 
in the future:

- Comparison
    - $eq
    - $gt
    - $gte
    - $lt
    - $lte
    - $ne
    - $in
    - $nin

- Logical (*NOT IMPLEMENTED YET*)

- Element
    - $exists
    - $type (*different*, but add in some *custom Types*)

- Evaluation
    - $mod
    - $regex
    - $text (*different*)
    - $where (*partial*)

- Array (*NOT IMPLEMENTED YET*)

### Todo

* Add in an implementation of AssertError or something.

### Changelogs

* 0.3.0 op.test() now throw an error if the test failed.