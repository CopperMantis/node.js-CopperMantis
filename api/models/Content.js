/**
* Content.js
*
* @description :: Any written representation of document like: pages, problems
* menu items and submited solutions.
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,

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
      validId: true,
      required: true
    },
    match: {
      type: 'string',
      validId: true
    },
    meta: {
      type: 'json'
      // Could be the "amout of points" for a desired problem or any other variable attribute.
      // difficulty
      // tags
      // relatedTo
    },
    attachment: {
      type: 'array'
      // [{id: 'string'}, ... ]
      // [{in: [], out: []}]
    }
  }
};
