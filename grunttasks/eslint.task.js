'use strict';
module.exports = (grunt) => {
    grunt.config('eslint', {
        options: {
            configFile: '.eslintrc',
        },
        target: ['./src/**/*.js', './test/**/*.js'],
    });

    grunt.loadNpmTasks('grunt-eslint');
};
