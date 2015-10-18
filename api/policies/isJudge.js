/**
 * isJudge
 *
 * @module      :: Policy
 * @description :: Verify req.user.role if it is judge or higher
 *
 */
module.exports = function(req, res, next) {

  if (!req.user || !req.user.role) {
    return res.unauthorized({message: 'You must be authenticated'});
  }

  if (req.user.role.indexOf('judge,admin') >= 0 || req.user.id === 0 ) {
    return next();
  }

  return res.unauthorized();
};
