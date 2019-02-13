'use strict';
module.exports = (grunt) => {
    grunt.config('clean', {
        test: ['test/results'],
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};
