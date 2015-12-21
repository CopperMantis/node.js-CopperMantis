var _ = require('lodash');
var faker = require('faker');

module.exports = {

  randomCompetitor: function (base) {
    var user = {
      username: faker.internet.username(),
      password: 'secret',
      email: faker.internet.email()
    };

    _.merge(page, base);

    return page;
  },
  randomJudge: function (base) {
    var user = {
      username: faker.internet.username(),
      password: 'secret',
      email: faker.internet.email(),
      role: 'judge'
    };

    _.merge(page, base);

    return page;
  },
  randomAdmin: function (base) {
    var user = {
      username: faker.internet.username(),
      password: 'secret',
      email: faker.internet.email(),
      role: 'admin'
    };

    _.merge(page, base);

    return page;
  },
};
