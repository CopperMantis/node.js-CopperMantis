/**
 * MongoDB seeds
 * (sails.config.http)
 *
 * Configuration database seeder
 *
 * For more information on configuration, check out:
 * https://github.com/lykmapipo/sails-hook-seed
 */

module.exports.seed = {
  path: 'data/seeds',
  active: !!process.env.WATERLINE_MIGRATE
};
