/**
 * Production environment settings
 *
 * Don't add any private information to this file!
 */

module.exports = {

  models: {
    migrate: 'safe'
  },

  session: {
    adapter: 'sails-mongo'
  },

  port: process.env.PORT,

  log: {
    level: 'error'
  }

};
