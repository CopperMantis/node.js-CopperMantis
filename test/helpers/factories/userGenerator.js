var _ = require('lodash');
var faker = require('faker');

module.exports = {

  randomCompetitor: function (base) {
    var user = {
      username: faker.internet.username(),
      password: 'secret',
      email: faker.internet.email()
    };

    _.merge(user, base);

    return user;
  },
  randomJudge: function (base) {
    var user = {
      username: faker.internet.username(),
      password: 'secret',
      email: faker.internet.email(),
      role: 'judge'
    };

    _.merge(user, base);

    return user;
  },
  randomAdmin: function (base) {
    var user = {
      username: faker.internet.username(),
      password: 'secret',
      email: faker.internet.email(),
      role: 'admin'
    };

    _.merge(user, base);

    return user;
  }
};
