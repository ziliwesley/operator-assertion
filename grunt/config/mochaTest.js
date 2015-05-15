'use strict';

module.exports = {
    all: {
        src: [
            'test/**/*.js'
        ],
        options: {
            reporter: 'spec',
            spawn: false,
            clearRequireCache: true
        }
    }
};