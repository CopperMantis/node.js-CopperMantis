var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var httpMocks = require('node-mocks-http');

chai.use(sinonChai);

describe('policies/hasValidToken', function() {

  describe('.hasValidToken', function () {
    var hasValidToken;

    before(function () {
      hasValidToken = sails.hooks.policies.middleware.hasvalidtoken;
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
      var callbackSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      hasValidToken(request, response, callbackSpy);
      setTimeout(function () {
        expect(callbackSpy).to.have.been.called;
        expect(unauthorizedSpy).to.not.have.been.called;
        expect(request.user).to.be.an('object');
        expect(request.user.id).to.exist;
        expect(request.user.role).to.exist;
        expect(request.user.iat).to.exist;
        expect(request.user.exp).to.exist;
        done();
      }, 100);
    });

    it('should not allow to continue when it provides an invalid token', function (done) {
      var request = httpMocks.createRequest({
        headers: {
          Authorization: 'Bearer invalid'
        }
      });
      var response = httpMocks.createResponse();
      var unauthorizedSpy = sinon.spy();
      var callbackSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      hasValidToken(request, response, callbackSpy);
      setTimeout(function () {
        expect(callbackSpy).to.not.have.been.called;
        expect(unauthorizedSpy).to.have.been.called;
        done();
      }, 100);
    });
  });
});
