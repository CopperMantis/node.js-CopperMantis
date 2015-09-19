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
  bcrypt.hash(inputs.password, 10, function(err, hash) {
    if(err) {
      return next(err);
    }
    inputs.password = hash;
    next();
  });
}

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,

  attributes: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      defaultsTo: 'player'
    }
  },

  beforeCreate: function (inputs, next) {
    _hashPassword(inputs, next);
  },

  beforeUpdate: function (inputs, next) {
    _hashPassword(inputs, next);
  },

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
      return next(null, {id: 0, rol: 'admin', username: inputs.username});
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

  isAdmin: function (usr) {
    return usr !== undefined && usr.rol === 'admin';
  },

  isJudge: function (usr) {
    return usr !== undefined && (usr.rol === 'judge' || usr.rol === 'admin');
  }
};
