const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const DBUtil = require('../../core/dbUtil');
const httpUtil = require('../../core/httpUtil');
const validations = require('../../core/validations');
const statusCode = require('../../core/statusCode');
const messages = require('../../core/messages');
const Reminder = require('./reminder.model');

const collectionName = 'reminder';

const save = function (req, res) {
  const payload = req.body;
  const reminder = new Reminder(payload);

  if (validations.notNull(payload, ['product', 'dueDate'])) {
    DBUtil.insertOne(collectionName, reminder, () => {
      httpUtil.sendResponse(res, statusCode.OK, 'Lembrete cadastrado com sucesso.');
    });
  } else {
    httpUtil.sendResponse(res, statusCode.BAD_REQUEST, messages.getRequiredMessage(validations.getNullFields(payload, ['description', 'dueDate'])));
  }
}

const updateOne = function (req, res) {
  const payload = req.body;
  const query = { _id: new ObjectId(req.params.id) };
  const reminder = new Reminder(payload);

  if (validations.notNull(payload, ['product', 'dueDate'])) {
    DBUtil.updateOne(collectionName, query, reminder, () => {
      httpUtil.sendResponse(res, statusCode.OK, 'Lembrete cadastrado com sucesso.');
    });
  } else {
    httpUtil.sendResponse(res, statusCode.BAD_REQUEST, messages.getRequiredMessage(validations.getNullFields(payload, ['description', 'dueDate'])));
  }
}

const find = function (req, callback) {
  DBUtil.find(collectionName, DBUtil.getFilter(req), DBUtil.getSort(req), (err, reminders) => {
    callback(err, reminders);
  });
}

const findNearestDue = function (req, callback) {
  DBUtil.connect((err, db) => {
    db.db().collection(collectionName).find({ removed: { $ne: true } }).sort({ dueDate: 1 }).limit(1).toArray((err, res) => {
      if (res) {
        req.query.filterAnd = `dueDate|${res[0].dueDate}`;
        find(req, callback);
      } else {
        callback(err, []);
      }
      db.close();
    });
  });
}

const findById = function (req, callback) {
  DBUtil.connect((err, db) => {
    db.db().collection(collectionName).findOne({ _id: new ObjectId(req.params.id) }, (err, reminder) => {
      callback(err, reminder);
    });
  });
}

const remove = function (req, callback) {
  DBUtil.remove(collectionName, { _id: new ObjectId(req.params.id) }, (err, reminder) => {
    callback(err, reminder);
  });
}

module.exports = {
  save,
  updateOne,
  find,
  findNearestDue,
  findById,
  remove
};