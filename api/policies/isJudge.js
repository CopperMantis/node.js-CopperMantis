/**
 * isJudge
 *
 * @module      :: Policy
 * @description :: Verify req.user.role if it is judge or higher
 *
 */
module.exports = function (req, res, next) {
  var roles = 'judge,admin';

  if (!req.user || !req.user.role) {
    return res.unauthorized({message: 'You must be authenticated'});
  }

  if (~roles.indexOf(req.user.role) || req.user.id === 0) {
    return next();
  }

  return res.forbidden({message: 'Access denied'});
};
