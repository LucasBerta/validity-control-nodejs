'use strict';

var HttpUtil = require('../../core/http');
var Endpoints = require('../../core/endpoints');

HttpUtil.Http.get(Endpoints.TEST, function (req, res) {
  res.send('Test works!');
});