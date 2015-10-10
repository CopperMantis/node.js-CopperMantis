var Sails = require('sails');
var rc = require('rc');
var sails;

before(function(done) {
  Sails.lift(rc('sails'), function(err, server) {
    sails = server;
    done && done(err, sails);
  });
});

after(function(done) {


  Sails.lower(done);
});
