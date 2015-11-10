/**
 * hasValidConentSlug
 *
 * @module      :: Policy
 * @description :: Check if contentSlug parameter is valid
 *
 */
module.exports = function(req, res, next) {
  var validSlugs = 'menu page problem';
  var contentSlug = req.params.contentSlug ? req.params.contentSlug : '-';

  if (~ validSlugs.indexOf(contentSlug)) {
    return res.notFound({message: 'Content type' + contentSlug + 'not found'});
  }

  req.meta = { type: contentSlug };
  return next();
};
