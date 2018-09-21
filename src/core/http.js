const express = require('express');
const bodyParser = require('body-parser');

const Http = express();

Http.use(bodyParser.json());
Http.use(express.static('./'));
Http.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Content-Type', 'application/json');
  next();
});

module.exports = Http;