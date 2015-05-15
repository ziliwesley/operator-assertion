'use strict';

module.exports = {
    autotest: {
        files: [
            'lib/**/*.js',
            'test/*.js'
        ],
        tasks: [
            'jshint',
            'mochaTest'
        ],
        options: {
            spawn: false
        }
    }
};