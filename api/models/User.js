/**
* User.js
*
* @description :: The user model
* @docs        :: docs/UserModel.md
*/
var bcrypt = require('bcrypt');

/**
 * Hash your password
 *
 * @param {Object}  inputs
 *                    - username  {String}
 *                    - email     {String}
 *                    - password  {String}
 * @param {Function} next
 */
function _hashUserPassword (inputs, next) {

  if (inputs.password) {
    bcrypt.hash(inputs.password, 10, function(err, hash) {
      if(err) {
        return next(err);
      }
      inputs.password = hash;
      next(err, inputs);
    });
  } else {
    next(err, inputs);
  }
}

// TODO: Implement soft delete https://github.com/balderdashy/waterline/pull/902
// or even using "deletedAt" approach

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,

  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      email: {}
    },
    role: {
      type: 'string',
      enum: ['participant', 'judge', 'admin'], // "root" is a pseudo role
      defaultsTo: 'participant'
    },
    meta: {
      type: 'json'
      // Any other user metadata
    },
    isAdmin: function () {
      return this.role === 'admin' || this.id === 0;
    },
    isJudge: function () {
      return this.role === 'judge' || this.role === 'admin' || this.id === 0;
    }
  },

  beforeCreate: function (inputs, next) {
    _hashUserPassword(inputs, next);
  },

  beforeUpdate: function (inputs, next) {
    _hashUserPassword(inputs, next);
  },

  hashPassword: _hashUserPassword,
};
