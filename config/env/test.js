/**
 * Test environment settings
 */

module.exports = {

  connections: {
    mongodb: {
      adapter: 'sails-mongo',
      database: 'CopperMantisTest',
      host: process.env.DOCKER_HOST
              ? process.env.DOCKER_HOST.match(/\d+\.\d+\.\d+\.\d+/)[0]
              : '127.0.0.1',
      port: 27017
    }
  },

  models: {
    migrate: 'drop'
  },

  session: {
    adapter: 'sails-memory'
  },

  log: {
    level: 'debug'
  },

  seed: {
    active: false
  }

};
