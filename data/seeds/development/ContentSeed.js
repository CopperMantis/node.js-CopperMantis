var faker = require('faker');
var moment = require('moment');

module.exports = [
  {
    owner: 0,
    title: 'Welcome page',
    type: 'page',
    status: 'published',
    content: '# Markdown title \n' + faker.lorem.paragraph()
  },
  {
    owner: 0,
    title: 'untitle page',
    type: 'page',
    status: 'draft',
    content: '# Another markdown title \n' + faker.lorem.paragraph()
  },
  {
    owner: 0,
    title: 'Home',
    type: 'menu',
    status: 'published',
    content: 'welcome-page'
  },
  {
    owner: 0,
    title: 'Problems',
    type: 'menu',
    status: 'published',
    content: 'problems',
    meta: {
      action: 'change_state'
    }
  },
  {
    owner: 0,
    title: 'Fibonacci',
    type: 'problem',
    status: 'published',
    content: 'The old fibonacci algorith description',
    meta: {
      value: 5
    },
    attachment:[
      {
        in:
        [
          {
            content: '0..3'
          },
          {
            content: '0..10'
          },
          {
            content: '5..13'
          }
        ]
      },
      {
        out:
        [
          {
            content: '0, 1, 1, 2'
          },
          {
            content: '0, 1, 1, 2, 3, 5, 8, 13, 21, 34'
          },
          {
            content: '8, 13, 21, 34, 55, 89, 144, 233'
          }
        ]
      }
    ]
  },
];
