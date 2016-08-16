/**
 * ContentController
 *
 * @description :: Multi endpoint controller
 */

var _ = require('lodash');

module.exports = {

  create: function (req, res) {
    var payload = req.body;
    payload.type = req.meta ? req.meta.type : '';
    payload.owner = req.user ? req.user.id : '';

    return sails.models.content.create(payload)
      .then(function (record) {
        res.ok({ message: 'Item created' });
      })
      .catch(function (reason) {
        res.negotiate(reason);
      });
  },
  find: function (req, res) {
    return sails.models.content.find({
      type: req.meta.type
    })
      .then(function (records) {
        res.ok(records);
      })
      .catch(function (reason) {
        res.negotiate(reason);
      });
  },
  findOne: function (req, res) {
    return sails.models.content.findOne({
      id: req.params.id,
      type: req.meta.type
    })
      .then(function (record) {
        if (!record) {
          return res.notFound();
        }

        return res.ok(record);
      })
      .catch(function (reason) {
        return res.negotiate(reason);
      });
  },
  findByMatch: function (req, res) {
    return sails.models.content.find({
      match: req.params.matchId,
      type: req.meta.type
    })
      .then(function (records) {
        res.ok(records);
      })
      .catch(function (reason) {
        res.negotiate(reason);
      });
  },
  findOneByMatch: function (req, res) {
    return sails.models.content.findOne({
      id: req.params.id,
      match: req.params.matchId,
      type: req.meta.type
    })
      .then(function (record) {
        if (!record) {
          return res.notFound();
        }

        res.ok(record);
      })
      .catch(function (reason) {
        res.negotiate(reason);
      });
  },
  update: function (req, res) {
    var payload = req.body;
    payload.type = payload.type || req.meta.type;

    return sails.models.content.update({
      id: req.params.id,
      type: req.meta.type
    }, payload)
      .then(function (records) {
        if (!records.length) {
          return res.notFound();
        }

        res.ok(records[0]);
      })
      .catch(function (reason) {
        res.negotiate(reason);
      });
  },
  destroy: function (req, res) {
    return sails.models.content.destroy({
      id: req.params.id,
      type: req.meta.type
    })
      .then(function (records) {
        if (!records.length) {
          return res.notFound();
        }
        res.ok({ message: 'Item succesfully deleted' });
      })
      .catch(function (err) {
        sails.log.debug('Something went wrong with content destroy', err);
        res.negotiate(err);
      });
  },
  _config: {
    rest: false
  }
};
