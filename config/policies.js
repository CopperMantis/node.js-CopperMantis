/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */

module.exports.policies = {

  // Default policy for all controllers and actions
  '*': false,

  AuthController: {
    login: true
  },

  MatchController: {
    find: true,
    findOne: true,
    create: ['hasValidToken', 'isAdmin'],
    update: ['hasValidToken', 'isAdmin'],
    destroy: ['hasValidToken', 'isAdmin']
  },

  ContentController: {
    findByMatch: ['hasValidContentSlug','hasValidToken'],
    findOneByMatch: ['hasValidContentSlug','hasValidToken'],
    find: ['hasValidContentSlug'],
    findOne: ['hasValidContentSlug', 'hasValidToken', 'isAdmin'],
    create: ['hasValidContentSlug', 'hasValidToken', 'isAdmin'],
    update: ['hasValidContentSlug', 'hasValidToken', 'isAdmin'],
    destroy: ['hasValidContentSlug', 'hasValidToken', 'isAdmin']
  },

  SolutionController: {
    '*': 'hasValidToken'
  },

};
