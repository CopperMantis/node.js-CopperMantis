/**
* User.js
*
* @description :: The user model
* @docs        :: docs/UserModel.md
*/
module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,
  // TODO: Implement soft delete https://github.com/balderdashy/waterline/pull/902
  // or even using "deletedAt" approach

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
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (inputs, next) {
    _hashUserPassword(inputs, next);
  },

  beforeUpdate: function (inputs, next) {
    _hashUserPassword(inputs, next);
  }
};

/**
 * Hash your password
 *
 * @param {Object}  userObject
 *                    - username  {String}
 *                    - email     {String}
 *                    - password  {String}
 * @param {Function} next
 */
function _hashUserPassword (user, next) {

  if (user.password) {
    sails.services.auth.generateHash(user.password)
      .then(function (hash) {
        user.password = hash;
        return next(null, user);
      })
      .catch(next);
  } else {
    next(null, user);
  }
}
