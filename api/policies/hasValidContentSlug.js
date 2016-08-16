/**
 * hasValidContentSlug
 *
 * @module      :: Policy
 * @description :: Check if contentSlug parameter is valid
 *
 */
module.exports = function (req, res, next) {
  var validSlugs = 'menu page problem';
  var contentSlug = req.params.contentSlug ? req.params.contentSlug : '-';

  if (~validSlugs.indexOf(contentSlug)) {
    req.meta = { type: contentSlug };
    return next();
  }

  return res.notFound({message: 'Content type ' + contentSlug + ' not found'});
};
