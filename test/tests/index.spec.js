/* global expect, describe, it*/
'use strict';

const nodgineStatic = require('../../src/index');

describe('nodgine-static', () => {
    it('should export a function', () => {
        expect(nodgineStatic).to.be.a('function');
    });
});