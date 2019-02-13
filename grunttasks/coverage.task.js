'use strict';
module.exports = (grunt) => {
    const path = require('path');
    const istanbul = require('istanbul');

    grunt.registerTask('startCoverageCollection', '', () => {
        const srcDir = path.resolve(__dirname, '../src');
        const instrumenter = new istanbul.Instrumenter();
        const matcher = (aFileName) => {
            return path.resolve(aFileName).indexOf(srcDir) > -1;
        };

        istanbul.hook.hookRequire(matcher, instrumenter.instrumentSync.bind(instrumenter));
    });

    grunt.registerTask('stopCoverageCollection', () => {
        istanbul.hook.unhookRequire();
        const targetDirectory = path.resolve(__dirname, '../test/results');
        const collector = new istanbul.Collector();

        collector.add(global.__coverage__);

        // and finally generate the report
        istanbul.Report
            .create('lcov', {
                dir: targetDirectory,
            })
            // but do it sync (second param)
            .writeReport(collector, true);
    });
};
