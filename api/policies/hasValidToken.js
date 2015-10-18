/**
 * hasValidToken
 *
 * @module      :: Policy
 * @description :: Verify if has a valid jwt and sets user object to request
 *
 */
module.exports = function(req, res, next) {

  var header = req.headers['Authorization'] || req.headers['authorization'];
  var token = header && header.length > 6 ? header.substring(7) : '';

  if (!token) {
    return res.unauthorized({message: 'You must be authenticated'});
  }

  sails.services.auth.verifyToken(token)
    .then(function (decoded) {
      req.user = decoded;
      next();
    })
    .catch(function (err) {
      res.unauthorized({message: 'Invalid token', error: err});
    });

};
