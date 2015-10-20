/**
 * AuthController
 *
 * @description :: Authentication controller almost all its logic relies in services/Auth.js
 */

module.exports = {
  login: function (req, res) {
    sails.services.auth.attemptLogin(req.params.all())
      .then(res.ok)
      .catch(res.badRequest);
  },
  logout: function(req, res) {
    // TODO: maybe blacklist the used token.
  },
  register: function(req, res){
    // TODO
  },
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
};
