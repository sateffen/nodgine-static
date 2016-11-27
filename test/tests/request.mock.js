'use strict';

module.exports = class RequestMock {
    constructor() {
        this._method = 'GET';
        this._requestPath = '/';
    }

    getMethod() {
        return this._method;
    }

    getRequestPath() {
        return this._requestPath;
    }
};