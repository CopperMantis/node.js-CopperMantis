/**
* MatchEvent.js
*
* @description :: Every action triggered by a competitor into a contest
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAt: false,

  types: {
    owned: function(ownerId){
      return /[0-9a-fA-F]{24}/.test(ownerId) || ownerId === '0';
    }
  },

  attributes: {
    owner: {
      type: 'string',
      required: true,
      owned: true
    },
    type: {
      type: 'string',
      enum: ['solution_submition', 'solution_queued', 'solution_tested', 'solution_manually_reviewed'],
      required: true
    },
    meta: {
      type: 'json'
      // Any other metadata like judge Id if it was manually reviewed
    }
  }
};
