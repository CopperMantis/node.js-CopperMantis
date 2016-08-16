/**
 * 401 (Unauthorized) Handler
 *
 * Usage:
 * return res.unauthorized();
 * return res.unauthorized(err);
 *
 * e.g.:
 * ```
 * return res.unauthorized('Invalid token');
 * ```
 */

module.exports = function unauthorized (data) {
  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(401);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 401 ("Forbidden") response: \n', data);
  } else {
    sails.log.verbose('Sending 401 ("Forbidden") response');
  }

  if (sails.config.environment === 'production') {
    data.error = undefined;
  }

  return res.jsonx(data || { message: 'Unauthorized access' });
};
