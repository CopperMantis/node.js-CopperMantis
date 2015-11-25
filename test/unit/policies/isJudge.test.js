var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var httpMocks = require('node-mocks-http');

chai.use(sinonChai);

describe('policies/isJudge', function() {

  describe('.isJudge', function () {
    var isJudge;

    before(function () {
      isJudge = sails.hooks.policies.middleware.isjudge;
    });

    it('should let pass to any user with judge role', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callbackSpy = sinon.spy();
      var forbiddenSpy = sinon.spy();
      response.forbidden = forbiddenSpy;

      request.user = {
        role: 'judge'
      };

      isJudge(request, response, callbackSpy);
      expect(callbackSpy).to.have.been.called;
      expect(forbiddenSpy).to.not.have.been.called;
    });

    it('should let pass to any user with admin role', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callbackSpy = sinon.spy();
      var forbiddenSpy = sinon.spy();
      response.forbidden = forbiddenSpy;

      request.user = {
        role: 'admin'
      };

      isJudge(request, response, callbackSpy);
      setTimeout(function () {
        expect(callbackSpy).to.have.been.called;
        expect(forbiddenSpy).to.not.have.been.called;
        done();
      }, 100);
    });

    it('should let pass the root user', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var forbiddenSpy = sinon.spy();
      response.forbidden = forbiddenSpy;

      request.user = {
        id: 0,
        role: 'root'
      };

      isJudge(request, response, callback);
      expect(callback).to.have.been.called;
      expect(forbiddenSpy).to.not.have.been.called;
    });

    it('should not let pass to any other role', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var forbiddenSpy = sinon.spy();
      response.forbidden = forbiddenSpy;

      request.user = {
        id: 'some-mongo-id',
        role: 'competitor'
      };

      isJudge(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(forbiddenSpy).to.have.been.called;
    });

    it('should not let pass to anonymous user', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var unauthorizedSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      isJudge(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(unauthorizedSpy).to.have.been.called;
    });
  });
});
