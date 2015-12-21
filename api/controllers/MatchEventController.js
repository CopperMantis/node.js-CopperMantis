/**
 * MatchEventController
 *
 * @description :: Server-side logic for managing Matchevents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findOne: function (req, res) {
    sails.log.debug(req.params.all());

    return res.ok();
  }
};
