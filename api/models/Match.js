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
    createdBy: {
      type: 'string',
      validId: true,
      required: true
    },
    status: {
      type: 'string',
      enum: ['scheduled', 'ongoing', 'finished'],
      defaultsTo: 'scheduled'
    },
    start: {
      type: 'date',
      required: true
    },
    end: {
      type: 'date',
      required: true
    }
  }
};
