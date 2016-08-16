/**
 * MatchController
 *
 * @description :: Server-side logic for managing matches. These functions are done
 * by sails blueprint and model validation.
 *  - find
 *  - findOne
 *  - update
 * You can find the ACL for this controller in config/policies
 */

var _ = require('lodash');

module.exports = {

  create: function (req, res) {
    var match = req.body;
    match.createdBy = req.user ? req.user.id : '';

    return sails.models.match.create(match)
      .then(function () {
        res.ok({ message: 'Match succesfully created' });
      }).catch(function (err) {
        sails.log.verbose('Something went wrong with contest creation', err);
        res.negotiate(err);
      });
  },

  destroy: function (req, res) {
    return sails.models.match.destroy(req.params.id)
      .then(function () {
        res.ok({ message: 'Match succesfully deleted' });
      }).catch(function (err) {
        sails.log.verbose('Something went wrong with contest destroy', err);
        res.negotiate(err);
      });
  }
};
