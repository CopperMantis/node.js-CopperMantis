var moment = require('moment');

module.exports = {
  createdBy: 0,
  start: moment().format(),
  end: moment().add(7, 'days').format(),
};
