/**
 * Production environment settings
 *
 * Don't add any private information to this file!
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    connection: 'mongo'
  },

  /***************************************************************************
   * Default production port: 80; change env value PORT in the container     *
   ***************************************************************************/
  // port: 1337,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/
  log: {
    level: 'error'
  }

};
