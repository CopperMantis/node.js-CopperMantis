var _ = require('lodash');
var faker = require('faker');
var moment = require('moment');

module.exports = {
  randomPage: function (base) {
    var page = {
      title: faker.lorem.sentence(),
      type: 'page',
      content: faker.lorem.paragraphs(),
      owner: 0
    };

    _.merge(page, base);

    return page;
  },
  randomMenu: function (base) {
    var menuItem = {
      title: faker.lorem.sentence(),
      type: 'menu',
      content: faker.lorem.sentence(),
      owner: 0
    };

    _.merge(menuItem, base);

    return menuItem;
  },
  randomProblem: function (base) {
    var problem = {
      title: faker.lorem.sentence(),
      type: 'problem',
      content: faker.lorem.paragraphs(),
      owner: 0
    };

    _.merge(problem, base);

    return problem;
  }
};
