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
    begins: {
      type: 'date'
    },
    ends: {
      type: 'date'
    }
  }
};
