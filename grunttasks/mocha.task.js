'use strict';
module.exports = (grunt) => {
    require('./coverage.task.js')(grunt);

    grunt.config('mochaTest', {
        run: {
            options: {
                reporter: 'spec',
                captureFile: 'test/results/result.txt',
                require: [
                    'test/setup/chai',
                    'test/setup/chaispies',
                    'test/setup/unhandledrejection',
                ],
            },
            src: ['./test/tests/**/*.js'],
        },
    });

    grunt.registerTask('coveredMocha', ['startCoverageCollection', 'mochaTest', 'stopCoverageCollection']);

    grunt.loadNpmTasks('grunt-mocha-test');
};
