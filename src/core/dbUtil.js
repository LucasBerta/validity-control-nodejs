const MongoClient = require('mongodb').MongoClient;

const hostName = 'localhost';
const port = 27017;
const url = `mongodb://${hostName}:${port}/inventorycontrol`;

const connect = function (callback, options = {}) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    if (callback) {
      callback(err, db);
    }
    if (options.autoClose !== false) {
      db.close();
    }
  });
};

const createCollection = function (name, callback, connectOptions = {}) {
  connect((err, db) => {
    db.db().createCollection(name, (err, collection) => {
      if (callback) {
        callback(err, collection);
      }
      db.close();
    });
  }, { ...connectOptions, autoClose: false });
};

const insertOne = function (collectionName, obj, callback, connectOptions = {}) {
  connect((err, db) => {
    db.db().collection(collectionName).insertOne(obj, (err, res) => {
      if (callback) {
        callback(err, res);
      }
      db.close();
    });
  }, { ...connectOptions, autoClose: false });
};

const insertMany = function (collectionName, obj, callback, connectOptions = {}) {
  connect((err, db) => {
    db.db().collection(collectionName).insertMany(obj, (err, res) => {
      if (callback) {
        callback(err, res);
      }
      db.close();
    });
  }, { ...connectOptions, autoClose: false });
};

const updateOne = function (collectionName, query, obj, callback, connectOptions = {}) {
  connect((err, db) => {
    const objSet = { $set: obj };
    db.db().collection(collectionName).updateOne(query, objSet, { upsert: true }, (err, res) => {
      if (callback) {
        callback(err, res);
      }
      db.close();
    });
  }, { ...connectOptions, autoClose: false });
};

const remove = function (collectionName, query, callback, connectOptions = {}) {
  connect((err, db) => {
    db.db().collection(collectionName).remove(query, (err, res) => {
      if (callback) {
        callback(err, res);
      }
      db.close();
    });
  }, { ...connectOptions, autoClose: false });
};

const findOne = function (collectionName, query, callback, connectOptions = {}) {
  connect((err, db) => {
    db.db().collection(collectionName).find(query, (err, res) => {
      if (callback) {
        callback(err, res);
      }
      db.close();
    });
  }, { ...connectOptions, autoClose: false });
};

const find = function (collectionName, query, sort, callback, connectOptions = {}) {
  connect((err, db) => {
    db.db().collection(collectionName).find(query).sort(sort).toArray((err, res) => {
      if (callback) {
        callback(err, res);
      }
      db.close();
    });
  }, { ...connectOptions, autoClose: false });
};

const getSort = function (req) {
  const sort = req.query.sort;
  if (!sort) {
    return {};
  }
  const orderbySplit = sort.split(';');
  let sortObj = {};
  orderbySplit.forEach(order => {
    const orderSplit = order.split('|');
    const attr = orderSplit[0];
    const value = getOrderByValue(orderSplit[1]);
    sortObj[attr] = value;
  });
  return sortObj;
}

const getFilter = function (req) {
  const filterOr = req.query.filterOr;
  const filterAnd = req.query.filterAnd;
  if (!filterOr && !filterAnd) {
    return {};
  }
  let filterObj = {};
  const filterOrSplit = filterOr ? filterOr.split(';') : [];
  const filterAndSplit = filterAnd ? filterAnd.split(';') : [];
  filterOrSplit.forEach(filter => {
    filterObj.$or = filterObj.$or || [];
    filterObj.$or.push(getFilterObj(filter));
  });
  filterAndSplit.forEach(filter => {
    filterObj.$and = filterObj.$and || [];
    filterObj.$and.push(getFilterObj(filter));
  });
  return filterObj;
}

////////////////

function getFilterObj(filter) {
  const filterSplit = filter.split('|');
  const attr = filterSplit[0];
  let value = filterSplit[1];
  let operator = filterSplit[2] || '$regex';

  operator = operator.replace('$', '');
  operator = `$${operator}`;
  switch (operator) {
    case '$regex':
      const regexMatches = value.match(/^[\/]{0,}(.*?)[\/]{0,}([gim]*)$/);
      const regex = regexMatches[1];
      const regexFlags = regexMatches[2];
      value = new RegExp(regex, regexFlags);
      break;
    case '$in':
    case '$nin':
      value = value.split(',');
      break;
  }
  return { [attr]: { [operator]: getValue(value) } };
}

function getOrderByValue(value) {
  return value === 'desc' ? -1 : 1;
}

function getValue(value) {
  if (value === 'false') return false;
  if (value === 'true') return true;

  if (value instanceof Array) {
    return value.map(v => getValue(v));
  }

  return value;
}

module.exports = {
  connect,
  createCollection,
  insertOne,
  insertMany,
  updateOne,
  remove,
  find,
  findOne,
  find,
  getSort,
  getFilter
};