/**
 * Production environment settings
 *
 * Don't add any private information to this file!
 */

module.exports = {

  port: process.env.PORT,

  models: {
    migrate: 'safe'
  },

  session: {
    adapter: 'sails-mongo'
  },

  log: {
    level: 'error'
  },

  seed: {
    active: false
  }

};
