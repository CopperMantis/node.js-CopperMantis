/**
* api/services/Auth.js
*
* @description :: Authentication service
*/

var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

module.exports = {
  attemptLogin:  _attemptLogin,
  verifyToken: _verifyToken,
  //TODO: Register
  //TODO: Move hashPassword here
};

/**
 * Check validness of a login using the provided inputs.
 *
 * @param {Object} inputs
 *                  + username {String}
 *                  + password {String}
 * @return {Promise} with token
 */
function _attemptLogin(inputs) {
  return new Promise(function (resolve, reject) {
    var token;
    if (inputs.username === sails.config.globals.rootUsername && inputs.password === sails.config.globals.rootPassword) {
      token = _generateToken({ id: 0, role: 'root' });
      return resolve({token: token});
    }

    return sails.models.user.findOne({
      username: inputs.username
    }).then(function (user) {
      if(!user) return reject({error: 'User not found'});

      bcrypt.compare(inputs.password, user.password, function(berr, correct) {
        if(berr || !correct) return reject({error: 'Incorrect password'});
        token = _generateToken(user);
        return resolve({token: token});
      });
    }).catch(reject);
  });
}

function _generateToken(user) {
  var token = jwt.sign({ id: user.id, role: user.role }, sails.config.globals.jwtSecret, { expiresIn: '7d' } );
  return token;
}

function _verifyToken (token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, sails.config.globals.jwtSecret, function (err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}