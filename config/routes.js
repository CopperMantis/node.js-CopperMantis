/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Routes mapping URLs for controllers. Only the non blueprint urls are listed
 * in this file.
 *
 */

module.exports.routes = {

  /** **************************************************************************
   * Root endpoints                                                            *
   * - Good option for health check                                            *
   * - They don't rely on any database access or view rendering                *
   ****************************************************************************/
  '/': { response: 'ok' },
  '/v1': { response: 'ok' },

  /** **************************************************************************
   * User authentication and registration endpoints.                           *
   * - Non restful endpoints                                                   *
   ****************************************************************************/
  'POST /v1/auth/login': 'AuthController.login',

  /** **************************************************************************
   * Content Endpoints                                                         *
   * - Explicitly declared endpoints                                           *
   * - Each of these endpoinst rely hasValidContentSlug policy                 *
   ****************************************************************************/
  'GET /v1/content/:contentSlug': 'ContentController.find',
  'POST /v1/content/:contentSlug': 'ContentController.create',
  'PUT /v1/content/:contentSlug/:id': 'ContentController.update',
  'GET /v1/content/:contentSlug/:id': 'ContentController.findOne',
  'DELETE /v1/content/:contentSlug/:id': 'ContentController.destroy',
  'GET /v1/match/:matchId/:contentSlug': 'ContentController.findByMatch',
  'GET /v1/match/:matchId/:contentSlug/:id': 'ContentController.findOneByMatch'
};
