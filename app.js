#!/usr/bin/env node

var winston = require('winston');
var express = require('express');

var logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'spamilton'},
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'}),
  ],
});
var app = express();

var server = app.listen(5050, function(){
  var host=server.address().address;
  var port=server.address().port;
  logger.log({level: 'info', message: 'Starting up now asdf...'});
  console.log("Server running and listening at: %s:%s", host, port);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  logger.log({level: 'info', message: 'Test message, pls ignore.'});
  logger.log({level: 'error', message: 'ERROR No: ' + 5});
  console.log('home page request');
  res.sendFile(__dirname + '/home.html');
});
