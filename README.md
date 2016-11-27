# nodgine-static ![Codeship](https://codeship.com/projects/76e9e4a0-96d3-0134-3254-7e4be53ab501/status?branch=master)

This package is a helper for the [nodgine](https://github.com/sateffen/nodgine), which helps serving static files.

**Warning**: This package is currently in development, so it might work, or might not.

## Usage

To use this package just apply it as missingRouteHandler:

    'use strict';
    
    const http = require('http');    
    const Nodgine = require('nodgine');
    const nodgineStatic = require('nodgine-static');
    const app = new Nodgine();
    
    app.setMissingRouteController(nodgineStatic({}));
    
    http.createServer(app.getRouter()).listen(8888);

You can pass a configuration to *nodgineStatic*, that describes your setup.

## Configuration

The following options are available:

### rootDir

**Type**: String

**Default**: process.cwd()

**Description**: Describes the directory, from which the files should get loaded

### indexFile

**Type**: String

**Default**: 'index.html'

**Description**: The file to check if the user targets a directory. So if the user targets */dir*, he'll get
*/dir/index.html* by default

### defaultMimeType

**Type**: String

**Default**: 'application/octet-stream'

**Description**: The mimetype to use, if not mimetype could be determined

### notFoundHandler

**Type**: Function(Request, Response)

**Default**: Function setting the statuscode 404 and writing 'Not found';

**Description**: A function, that is called when no file was found

## Special behaviour

To prevent traversing up the file-tree, and prevent private files from leaking, all parts of the request path starting
with at least one point will be removed. So if the user requests a file like */dir/.gitignore*, the path will be chanced
to */dir/gitignore*. Paths like */../../private.file* will be rewritten to *///private.file*, which doesn't exist, so
the notFoundHandler will be called.