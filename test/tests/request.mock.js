'use strict';

module.exports = class RequestMock {
    /**
     * RequestMock constructor
     */
    constructor() {
        this._method = 'GET';
        this._requestPath = '/';
    }

    /**
     * Mock getMethod implementation
     * @return {string}
     */
    getMethod() {
        return this._method;
    }

    /**
     * Mock getRequestPath implementation
     * @return {string}
     */
    getRequestPath() {
        return this._requestPath;
    }
};
