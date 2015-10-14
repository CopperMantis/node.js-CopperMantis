var faker = require('faker');

module.exports = function (done) {

  var data = [];

  // 6 random competidors
  for (var i = 0; i < 6; i++) {
    data[i] = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'dummy123'
    };
  }

  // 2 test users
  data.push({
    username: 'winner',
    email: 'win@win.com',
    password: 'dummy123'
  });

  data.push({
    username: 'foobar',
    email: 'notso@lucky.com',
    password: 'dummy123'
  });

  // 2 judges
  data.push({
    username: 'judge1',
    email: 'doge@meme.com',
    password: 'dummy123',
    role: 'judge'
  });

  data.push({
    username: 'judge2',
    email: 'yuso@meme.com',
    password: 'dummy123',
    role: 'judge'
  });

  done(null, data);
};
