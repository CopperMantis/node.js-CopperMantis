/**
 * Connections
 * (sails.config.connections)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk and memory storage for DEVELOPMENT ONLY                       *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  memoryDB: {
    adapter: 'sails-memory'
  },

  /***************************************************************************
  *                                                                          *
  * MongoDB.                                                                 *
  *                                                                          *
  * Yeah is kinda ugly but is the only workaround that I have for multiple   *
  * adapter configuration in sails v0.11.2                                   *
  ***************************************************************************/
  mongodb: {
    adapter: 'sails-mongo',
    database: 'CopperMantis',
    host: process.env.MONGO_PORT_27017_TCP_ADDR ||
          process.env.DOCKER_HOST ?
            process.env.DOCKER_HOST.match(/\d+\.\d+\.\d+\.\d+/)[0] :
            'localhost',
    port: process.env.MONGO_PORT_27017_TCP_PORT || 27017
  },

};
