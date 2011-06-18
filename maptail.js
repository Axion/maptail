#!/usr/bin/env node
/*
* maptail <file_to_tail> [hostname] [port] [lines] [fadetime]
*/

var http = require('http');

var port = process.argv.length >= 4 && process.argv[4] || process.env.PORT || process.env.POLLA_PORT || 8080
, host = process.argv.length >= 3 && process.argv[3] || process.env.HOST || process.env.POLLA_HOST || 'localhost'
, wsport = process.env.WSPORT || port
, wshost = process.env.WSHOST || host
, lines = process.argv.length >= 5 && process.argv[5] || 1000
, fadetime = process.argv.length >= 6 && process.argv[6] || 2400000
, filename = process.argv.length >= 2 && process.argv[2] || 'nohup.out';

var wsserver = require('express').createServer();
wsserver.listen(port, host);

var map = require('./index');
map.listen({
    filename: filename,
    server: wsserver,
    wsport: wsport,
    wshost: wshost,
    lines: lines,
    fadetime: fadetime
});