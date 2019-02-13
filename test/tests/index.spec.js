/* global expect, describe, it, beforeEach, afterEach */
'use strict';

const chai = require('chai');
const nodgineStatic = require('../../src/index');
const fs = require('fs');
const path = require('path');
const RequestMock = require('./request.mock');
const ResponseMock = require('./response.mock');

const originalFsStat = fs.stat;
const originalFsCreateReadStream = fs.createReadStream;

describe('nodgine-static', () => {
    let request = null;
    let response = null;

    beforeEach(() => {
        fs.stat = chai.spy();
        fs.createReadStream = chai.spy((aParam) => {
            return aParam;
        });

        request = new RequestMock();
        response = new ResponseMock();
    });

    afterEach(() => {
        fs.stat = originalFsStat;
        fs.createReadStream = originalFsCreateReadStream;
    });

    it('should export a function', () => {
        expect(nodgineStatic).to.be.a('function');
    });

    it('should return a function calling the modules function', () => {
        expect(nodgineStatic()).to.be.a('function');
    });

    ['POST', 'PUT', 'DELETE'].forEach((aMethod) => {
        it('should call the notFoundHandler if the method is ' + aMethod, () => {
            const notFoundHandler = chai.spy();
            const func = nodgineStatic({
                notFoundHandler,
            });

            request._method = aMethod;

            func(request, response);

            expect(notFoundHandler).to.have.been.called.once();
        });
    });

    ['GET', 'HEAD'].forEach((aMethod) => {
        it('should return a promise if the method is ' + aMethod, () => {
            const notFoundHandler = chai.spy();
            const func = nodgineStatic({
                notFoundHandler,
            });

            request._method = aMethod;

            expect(func(request, response)).to.be.instanceOf(Promise);
        });

        it('should call the notFoundHandler because the request path does not exist', (done) => {
            const notFoundHandler = chai.spy('notFoundHandler');
            const func = nodgineStatic({
                notFoundHandler,
            });

            request._method = aMethod;
            request._requestPath = Math.random().toString(26).slice(2);

            func(request, response)
                .then(() => {
                    expect(notFoundHandler).to.have.been.called.once();
                })
                .then(done)
                .catch(done);
            fs.stat.__spy.calls[0][1](true);
        });
    });

    it('should append the indexFile to the path if needed', (done) => {
        const notFoundHandler = chai.spy('notFoundHandler');
        const func = nodgineStatic({
            notFoundHandler,
            rootDir: __dirname,
            indexFile: 'iamatestandnothing.else',
        });

        func(request, response)
            .then(() => {
                expect(notFoundHandler).to.not.have.been.called();
                expect(response._pipe).to.equal(path.join(__dirname, '/iamatestandnothing.else'));
            })
            .then(done)
            .catch(done);

        fs.stat.__spy.calls[0][1](null, {
            isDirectory: () => {
                return true;
            },
        });
    });

    it('should not append the indexFile to the path if not needed', (done) => {
        const notFoundHandler = chai.spy('notFoundHandler');
        const func = nodgineStatic({
            notFoundHandler,
            rootDir: __dirname,
            indexFile: 'iamatestandnothing.else',
        });

        request._requestPath = '/xedni.lmth';
        func(request, response)
            .then(() => {
                expect(notFoundHandler).to.not.have.been.called();
                expect(response._pipe).to.equal(path.join(__dirname, '/xedni.lmth'));
            })
            .then(done)
            .catch(done);

        fs.stat.__spy.calls[0][1](null, {
            isDirectory: () => {
                return false;
            },
        });
    });
});
