'use strict';

const assert = require('assert');

module.exports = class ResponseMock {
    constructor() {
        this._statusCode = 0;
        this._header = {};
        this._pipe = null;
    }

    setStatusCode(aStatusCode) {
        assert.ok(typeof aStatusCode === 'number');
        this._statusCode = aStatusCode;
        return this;
    }

    setHeader(aHeader, aValue) {
        assert.ok(typeof aHeader === 'string');
        assert.ok(typeof aValue === 'string');
        this._header[aHeader] = aValue;
        return this;
    }

    pipe(aPipe) {
        this._pipe = aPipe;
        return this;
    }
};