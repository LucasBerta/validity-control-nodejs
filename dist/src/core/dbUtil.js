'use strict';

var MongoClient = require('mongodb').MongoClient;

var hostName = 'localhost';
var port = 27017;
var url = 'mongodb://' + hostName + ':' + port + '/inventorycontrol';

var connect = function connect(callback, _ref) {
  var autoClose = _ref.autoClose;

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    callback(err, db);
    if (autoClose !== false) {
      db.close();
    }
  });
};

var createCollection = function createCollection(name, callback, options) {
  connect(function (err, db) {
    db.db().createCollection(name, function (err, db) {
      callback(err, db);
      db.close();
    });
  }, options);
};

module.exports = {
  connect: connect,
  createCollection: createCollection
};