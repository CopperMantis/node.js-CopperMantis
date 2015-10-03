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
function _hashPassword (inputs, next) {

  if (inputs.password) {
    bcrypt.hash(inputs.password, 10, function(err, hash) {
      if(err) {
        return next(err);
      }
      inputs.password = hash;
      next();
    });
  } else {
    console.log(inputs);
    next();
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
      enum: ['participant', 'judge', 'admin'],
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
    _hashPassword(inputs, next);
  },

  // beforeUpdate: function (inputs, next) {
  //   _hashPassword(inputs, next);
  // },

  /**
   * Check validness of a login using the provided inputs.
   *
   * @param {Object} inputs
   *                  + username {String}
   *                  + password {String}
   * @param {Function} next
   */
  attemptLogin: function (inputs, next) {
    if (inputs.username === sails.config.globals.admUsrName && inputs.password === sails.config.globals.admUsrPass) {
      return next(null, {id: 0, rol: 'root', username: inputs.username});
    }

    this.findOne({
      username: inputs.username
    }).exec(function(err, user){
      if (err || !user) {
        return next(err, false);
      }

      bcrypt.compare(inputs.password, user.password, function(berr, res) {
        if(!res) {
          return next(err, false);
        }
        return next(err, user);
      });
    });
  },

  hashPassword: _hashPassword,
};
