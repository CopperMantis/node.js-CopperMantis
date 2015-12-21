var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var httpMocks = require('../../helpers').factories.httpMocks;

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
      var response = httpMocks.createResponse({
        spies: {
          unauthorized: true
        }
      });
      var callbackSpy = sinon.spy();

      hasValidToken(request, response, callbackSpy);
      setTimeout(function () {
        expect(callbackSpy).to.have.been.called;
        expect(response.unauthorized).to.not.have.been.called;
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
      var response = httpMocks.createResponse({
        spies: {
          unauthorized: true
        }
      });
      var callbackSpy = sinon.spy();

      hasValidToken(request, response, callbackSpy);
      setTimeout(function () {
        expect(callbackSpy).to.not.have.been.called;
        expect(response.unauthorized).to.have.been.called;
        expect(response.unauthorized.args[0][0]).to.exist;
        done();
      }, 100);
    });
  });
});
