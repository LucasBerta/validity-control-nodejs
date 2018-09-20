'use strict';

var express = require('express');

var Http = express();

Http.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Content-Type', 'application/json');
  next();
});

module.exports = {
  Http: Http
};