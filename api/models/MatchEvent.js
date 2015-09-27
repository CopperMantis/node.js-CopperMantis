/**
* MatchEvent.js
*
* @description :: Every action triggered by a participant into a contest
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAt: false,

  attributes: {
    owner: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      enum: ['solution_submition', 'solution_tested', 'solution_manually_reviewed'],
      required: true
    },
    meta: {
      type: 'json'
      // Any other metadata like judge Id if it was manually reviewed
    }
  }
};
