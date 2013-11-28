asteroids-server
================

A server to serve the asteroids game

Getting Started
---------------

To get started first install all packages by running the following
commands

```shell
npm install -g bower
```

This will install `bower` globally. Afterwards one can run

```shell
npm install
bower install
```

The server can be started with

```shell
node server.js
```

### Development

When developing you can start the server with

```shell
./node_modules/.bin/nodemon server.js
```

`nodemon` will watch the filesystem for changes and restart the server
accordingly.