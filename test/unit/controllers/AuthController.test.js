var chai = require('chai');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var httpMocks = require('../../helpers').factories.httpMocks;

chai.use(sinonChai);

describe('controllers/AuthController', function () {
  describe('.login()', function () {
    before(function (done) {
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
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: 'competitor103',
          password: 'dummy123'
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          badRequest: true
        }
      });

      sails.controllers.auth.login(request, response)
        .then(function () {
          expect(response.ok).to.be.called;
          expect(response.ok.args[0][0]).to.be.an('object').with.property('token');
          expect(response.badRequest).to.not.be.called;
          done();
        })
        .catch(function (reason) {
          done(reason);
        });
    });

    it('should return "bad request" for registered user with wrong password', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: 'competitor102',
          password: 'wrong-password'
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          badRequest: true
        }
      });

      sails.controllers.auth.login(request, response)
        .then(function () {
          expect(response.badRequest).to.be.called;
          expect(response.badRequest.args[0][0]).to.be.an('object').with.property('message');
          expect(response.ok).to.not.be.called;
          done();
        });
    });

    it('should return "bad request" for unregistered user', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          username: 'nobody',
          password: 'doesnt-matter'
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          badRequest: true
        }
      });

      sails.controllers.auth.login(request, response)
        .then(function () {
          expect(response.badRequest).to.be.called;
          expect(response.badRequest.args[0][0]).to.be.an('object').with.property('message');
          expect(response.ok).to.not.be.called;
          done();
        });
    });
  });
});
