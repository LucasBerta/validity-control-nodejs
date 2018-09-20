'use strict';

var MongoClient = require('mongodb').MongoClient;
var HttpUtil = require('./src/core/http');
var DBUtil = require('./src/core/dbUtil');
require('./src/routes/routes');

var hostname = 'localhost';
var port = 3000;

HttpUtil.Http.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/api/');
});

DBUtil.connect(function () {
  console.log('Database created!');
});