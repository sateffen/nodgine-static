'use strict';

const simpleMime = require('simple-mime');
const fs = require('fs');
const path = require('path');

module.exports = function (aConfig) {
    const config = aConfig && typeof aConfig === 'object' ? aConfig : {};
    const defaultMimeType = typeof config.defaultMimeType === 'string' ? config.defaultMimeType : 'application/octet-stream';
    const rootDir = typeof config.root === 'string' && config.root.length ? config.root : process.cwd();
    const indexFile = typeof config.indexFile === 'string' && config.indexFile.length ? config.indexFile : 'index.html';
    const notFoundHandler = typeof config.notFoundHandler === 'function' ? config.notFoundHandler : (aRequest, aResponse) => {
        aResponse
            .setStatusCode(404)
            .write('Not Found handler');
    };
    const mimeFunction = simpleMime(defaultMimeType);

    return (aRequest, aResponse) => {
        if (aRequest.getMethod() !== 'GET' && aRequest.getMethod() !== 'HEAD') {
            return notFoundHandler(aRequest, aResponse);
        }

        return new Promise((aResolve, aReject) => {
            const target = aRequest.getRequestPath().replace(/\/[.]+/g, '/');
            let targetPath = path.join(rootDir, target);

            fs.stat(targetPath, (aError, aStat) => {
                if (aError) {
                    return aReject(aError);
                }

                if (aStat.isDirectory()) {
                    targetPath = path.join(targetPath, indexFile);
                }

                aResponse
                    .setStatusCode(200)
                    .setHeader('Content-Type', mimeFunction(targetPath))
                    .pipe(fs.createReadStream(targetPath));

                return aResolve();
            });
        }).catch(() => {
            return notFoundHandler(aRequest, aResponse);
        });
    };
};