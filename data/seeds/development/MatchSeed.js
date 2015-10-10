var moment = require('moment');

module.exports = {
  start: moment().format(),
  end: moment().add(7, 'days').format(),
}
