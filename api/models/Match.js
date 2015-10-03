/**
* Match.js
*
* @description :: The "contest" metadata
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,

  attributes: {
    title: {
      type: 'string',
      defaultsTo: 'Programming contest'
    },
    start: {
      type: 'date'
    },
    end: {
      type: 'date'
    }
  }
};
