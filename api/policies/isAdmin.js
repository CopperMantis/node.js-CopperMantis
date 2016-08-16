/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Verify req.user.role if it is admin or higher
 *
 */
module.exports = function (req, res, next) {
  if (!req.user || !req.user.role) {
    return res.unauthorized({message: 'You must be authenticated'});
  }

  if (req.user.role === 'admin' || req.user.id === 0) {
    return next();
  }

  return res.forbidden({message: 'Access denied'});
};
