/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  connection: 'mongodb',
  migrate: 'alter',

  // Adding custom type "owned"
  types: {
    validId: function (id) {
      return /[0-9a-fA-F]{24}/.test(id) || id === '0';
    }
  }

};
