var Sails = require('sails');
var rc = require('rc');
var sails;

before(function(done) {
  Sails.lift(rc('sails'), function(err, server) {
    sails = sails;
    done && done(err, sails);
  });
});

after(function(done) {
  

  Sails.lower(done);
});
