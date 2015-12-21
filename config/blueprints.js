/**
 * Blueprint API Configuration
 * (sails.config.blueprints)
 *
 * These settings are for the global configuration of blueprint routes and
 * request options (which impact the behavior of blueprint actions).
 *
 * You may also override any of these settings on a per-controller basis
 * by defining a '_config' key in your controller defintion, and assigning it
 * a configuration object with overrides for the settings in this file.
 * A lot of the configuration options below affect so-called "CRUD methods",
 * or your controllers' `find`, `create`, `update`, and `destroy` actions.
 *
 * It's important to realize that, even if you haven't defined these yourself, as long as
 * a model exists with the same name as the controller, Sails will respond with built-in CRUD
 * logic in the form of a JSON API, including support for sort, pagination, and filtering.
 *
 * For more information on the blueprint API, check out:
 * http://sailsjs.org/#!/documentation/reference/blueprint-api
 *
 * For more information on the settings in this file, see:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.blueprints.html
 *
 */

module.exports.blueprints = {

  actions: false,
  shortcuts: false,

  /***************************************************************************
  *                                                                          *
  * RESTful routes (`sails.config.blueprints.rest`)                          *
  *                                                                          *
  * REST blueprints are the automatically generated routes Sails uses to     *
  * expose a conventional REST API on top of a controller's `find`,          *
  * `create`, `update`, and `destroy` actions.                               *
  *                                                                          *
  * For example, a BoatController with `rest` enabled generates the          *
  * following routes:                                                        *
  * :::::::::::::::::::::::::::::::::::::::::::::::::::::::                  *
  *  GET /boat -> BoatController.find                                        *
  *  GET /boat/:id -> BoatController.findOne                                 *
  *  POST /boat -> BoatController.create                                     *
  *  PUT /boat/:id -> BoatController.update                                  *
  *  DELETE /boat/:id -> BoatController.destroy                              *
  *                                                                          *
  ***************************************************************************/

  rest: true,

  /***************************************************************************
  *                                                                          *
  * An optional mount path for all blueprint routes on a controller.         *
  *                                                                          *
  * (NOTE: This only applies to blueprint autoroutes, not manual routes from *
  * `sails.config.routes`)                                                   *
  *                                                                          *
  ***************************************************************************/

  prefix: '/v1',

  /***************************************************************************
  *                                                                          *
  * Whether to pluralize controller names in blueprint routes.               *
  *                                                                          *
  * (NOTE: This only applies to blueprint autoroutes, not manual routes from *
  * `sails.config.routes`)                                                   *
  *                                                                          *
  ***************************************************************************/

  pluralize: false,

  /****************************************************************************
  *                                                                           *
  * The default number of records to show in the response from a "find"       *
  * action. Doubles as the default size of populated arrays if populate is    *
  * true.                                                                     *
  *                                                                           *
  ****************************************************************************/

  defaultLimit: 10

};
