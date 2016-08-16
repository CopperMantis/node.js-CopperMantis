var _ = require('lodash');
var faker = require('faker');
var moment = require('moment');

module.exports = {
  random: function (base) {
    var match = {
      title: faker.lorem.sentence(),
      createdBy: 0,
      start: moment().toISOString(),
      end: moment().add(Math.floor(Math.random() * 15), 'days').toISOString()
    };

    _.merge(match, base);

    return match;
  }
};
