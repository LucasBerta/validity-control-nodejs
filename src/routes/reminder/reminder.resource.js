const Http = require('../../core/http');
const Endpoints = require('../../core/endpoints');
const ReminderDB = require('./reminder.db');

Http.get('/', (req, res) => {
  res.send('Hello World!');
});

Http.get(Endpoints.REMINDER, (req, res) => {
  if (req.query.nearestDue === 'true') {
    ReminderDB.findNearestDue(req, (err, reminders) => {
      res.send(reminders);
    });
  } else {
    ReminderDB.find(req, (err, reminders) => {
      res.send(reminders);
    });
  }
});

Http.get(`${Endpoints.REMINDER}/:id`, (req, res) => {
  ReminderDB.findById(req, (err, reminder) => {
    res.send(reminder);
  });
});

Http.post(Endpoints.REMINDER, (req, res) => {
  ReminderDB.save(req, res);
});

Http.put(`${Endpoints.REMINDER}/:id`, (req, res) => {
  ReminderDB.updateOne(req, res);
});

Http.delete(`${Endpoints.REMINDER}/:id`, (req, res) => {
  ReminderDB.remove(req, () => {
    res.send();
  });
});
