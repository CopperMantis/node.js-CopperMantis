var expect = require('chai').expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');

describe('controllers/AuthController', function() {

  describe('.login()', function() {

    before(function (done) {
      // TODO: move this promise chaining as fixture
      sails.models.user.create({
        username: 'competitor103',
        password: 'dummy123',
        email: 'foo@bar.com'
      })
      .then(function () {
        sails.config.globals.rootUsername = 'ninja';
        sails.config.globals.rootPassword = 'h!dd3n';
      })
      .finally(done);
    });

    it('should return "ok" with a token for correct credentials', function (done) {
      var request  = httpMocks.createRequest({
          method: 'POST',
          body: {
            username: 'competitor103',
            password: 'dummy123'
          }
      });
      var response = httpMocks.createResponse();
      var okSpy = sinon.spy();
      response.ok = okSpy;

      sails.controllers.auth.login(request, response)
      .then(function () {
        expect(okSpy).to.be.called;
        expect(okSpy.args[0][0]).to.be.an('object').with.property('token');
        done();
      });
    });

    it('should return "bad request" for registered user with wrong password', function (done) {
      var request  = httpMocks.createRequest({
          method: 'POST',
          body: {
            username: 'competitor102',
            password: 'wrong-password'
          }
      });
      var response = httpMocks.createResponse();
      var badRequestSpy = sinon.spy();
      response.badRequest = badRequestSpy;

      sails.controllers.auth.login(request, response)
      .then(function () {
        expect(badRequestSpy).to.be.called;
        expect(badRequestSpy.args[0][0]).to.be.an('object').with.property('message');
        done();
      });
    });

    it('should return "bad request" for unregistered user', function (done) {
      var request  = httpMocks.createRequest({
          method: 'POST',
          body: {
            username: 'nobody',
            password: 'doesnt-matter'
          }
      });
      var response = httpMocks.createResponse();
      var badRequestSpy = sinon.spy();
      response.badRequest = badRequestSpy;

      sails.controllers.auth.login(request, response)
      .then(function () {
        expect(badRequestSpy).to.be.called;
        expect(badRequestSpy.args[0][0]).to.be.an('object').with.property('message');
        done();
      });
    });
  });
});
