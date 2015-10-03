/**
* Content.js
*
* @description :: Any written representation of something else like: pages, problems
* menu items and submited solutions.
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,

  types: {
    owned: function(ownerId){
      return /[0-9a-fA-F]{24}/.test(ownerId) || ownerId === '0';
    }
  },

  attributes: {
    title: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['page', 'problem', 'solution', 'menu'],
      required: true
    },
    status: {
      type: 'string',
    },
    content: {
      type: 'text'
    },
    owner: {
      type: 'string',
      owned: true,
      required: true
    },
    meta: {
      type: 'json'
      // Could be the "amout of points" for a desired problem or any other variable attribute.
    },
    attachment: {
      type: 'array'
      // [{id: 'string'}, ... ]
      // [{in: [], out: []}]
    }
  }
};
