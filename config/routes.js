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

  // Authentication endpoints
  'POST /v1/auth/login': 'AuthController.login',
  'POST /v1/auth/logout': 'AuthController.logout',
  'POST /v1/auth/register': 'AuthController.register',
  //TODO: add third party registration (via github or google mail)

  // Match Content
  'GET /v1/match/:matchId/content': 'ContentController.find',
  'POST /v1/match/:matchId/content': 'ContentController.create',
  'GET /v1/match/:matchId/content/:contentId': 'ContentController.findOne',
  'PUT /v1/match/:matchId/content/:contentId': 'ContentController.update',
  'DEL /v1/match/:matchId/content/:contentId': 'ContentController.destroy',

  // MatchEvents
  'GET /v1/match/:matchId/events': 'MatchEventController.find',
  'GET /v1/match/:matchId/events/:matchEventId': 'MatchEventController.findOne',
  'PUT /v1/match/:matchId/events/:matchEventId': 'MatchEventController.update',
  'DEL /v1/match/:matchId/events/:matchEventId': 'MatchEventController.destroy'

};
