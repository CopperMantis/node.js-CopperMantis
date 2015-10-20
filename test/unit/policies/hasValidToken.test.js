var expect = require('chai').expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');

describe('policies/hasValidToken', function() {

  describe('.hasValidToken', function () {
    var hasValidToken;

    before(function (done) {
      hasValidToken = sails.hooks.policies.middleware.hasvalidtoken;
      done();
    });

    it('should decode the user id and role from valid token', function (done) {
      var validToken = sails.services.auth._generateToken({id: 0, role: 'root'});
      var request = httpMocks.createRequest({
        headers: {
          Authorization: 'Bearer ' + validToken
        }
      });
      var response = httpMocks.createResponse();
      var unauthorizedSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      hasValidToken(request, response, function () {
        expect(unauthorizedSpy).to.not.be.called;
        expect(request.user).to.be.an('object');
        expect(request.user.id).to.exist;
        expect(request.user.role).to.exist;
        expect(request.user.iat).to.exist;
        expect(request.user.exp).to.exist;
        done();
      });
    });

    it('should not allow to continue when it provides an invalid token', function (done) {
      var request = httpMocks.createRequest({
        headers: {
          Authorization: 'Bearer invalid'
        }
      });
      var response = httpMocks.createResponse();
      var unauthorizedSpy = sinon.spy();
      var callback = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      hasValidToken(request, response, callback);
      expect(callback).to.not.be.called;
      expect(unauthorizedSpy).to.be.called;
      done();
    });
  });
});
