/**
 * AuthController
 *
 * @description :: Authentication controller almost all its logic relies in services/Auth.js
 */

module.exports = {

  login: function (req, res) {
    return sails.services.auth.attemptLogin(req.body)
      .then(res.ok)
      .catch(res.badRequest);
  },

  logout: function(req, res) {
    // TODO: maybe blacklist the used token.
  },

  register: function(req, res){
    // TODO
  },

};
