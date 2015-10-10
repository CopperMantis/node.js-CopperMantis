/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/': { response: 'ok'},
  '/v1': { response: 'ok'},

  /***************************************************************************
  *                                                                          *
  * Custom routes here... Sadly we have to EXPLICITLY write /v1 in each of   *
  * them.                                                                     *
  *                                                                          *
  ***************************************************************************/
  'GET /v1/match/:mid/events': 'MatchEventController.find',
  'GET /v1/match/:mid/events/:eid': 'MatchEventController.findOne',
  'PUT /v1/match/:mid/events/:eid': 'MatchEventController.update',
  'DEL /v1/match/:mid/events/:eid': 'MatchEventController.destroy'

};
