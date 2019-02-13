'use strict';

const assert = require('assert');

module.exports = class ResponseMock {
    /**
     * ResponseMock constructor
     */
    constructor() {
        this._statusCode = 0;
        this._header = {};
        this._pipe = null;
    }

    /**
     * Mock setStatusCode implementation
     * @param {number} aStatusCode
     * @return {this}
     */
    setStatusCode(aStatusCode) {
        assert.ok(typeof aStatusCode === 'number');
        this._statusCode = aStatusCode;
        return this;
    }

    /**
     * Mock setHeader implementation
     * @param {string} aHeader
     * @param {string} aValue
     * @return {this}
     */
    setHeader(aHeader, aValue) {
        assert.ok(typeof aHeader === 'string');
        assert.ok(typeof aValue === 'string');
        this._header[aHeader] = aValue;
        return this;
    }

    /**
     * Mock pipe implementation
     * @param {Object} aPipe
     * @return {this}
     */
    pipe(aPipe) {
        this._pipe = aPipe;
        return this;
    }
};
