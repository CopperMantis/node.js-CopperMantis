var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var httpMocks = require('../../helpers').factories.httpMocks;

chai.use(sinonChai);

describe('policies/isJudge', function () {
  describe('.isJudge', function () {
    var isJudge;

    before(function () {
      isJudge = sails.hooks.policies.middleware.isjudge;
    });

    it('should let pass to any user with judge role', function () {
      var request = httpMocks.createRequest({
        extra: {
          user: {
            role: 'judge'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          forbidden: true
        }
      });
      var callbackSpy = sinon.spy();

      isJudge(request, response, callbackSpy);
      expect(callbackSpy).to.have.been.called;
      expect(response.forbidden).to.not.have.been.called;
    });

    it('should let pass to any user with admin role', function (done) {
      var request = httpMocks.createRequest({
        extra: {
          user: {
            role: 'admin'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          forbidden: true
        }
      });
      var callbackSpy = sinon.spy();

      isJudge(request, response, callbackSpy);
      setTimeout(function () {
        expect(callbackSpy).to.have.been.called;
        expect(response.forbidden).to.not.have.been.called;
        done();
      }, 100);
    });

    it('should let pass the root user', function () {
      var request = httpMocks.createRequest({
        extra: {
          user: {
            id: 0,
            role: 'root'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          forbidden: true
        }
      });
      var callback = sinon.spy();

      isJudge(request, response, callback);
      expect(callback).to.have.been.called;
      expect(response.forbidden).to.not.have.been.called;
    });

    it('should not let pass to any other role', function () {
      var request = httpMocks.createRequest({
        extra: {
          user: {
            id: 'some-mongo-id',
            role: 'competitor'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          forbidden: true
        }
      });
      var callback = sinon.spy();

      isJudge(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(response.forbidden).to.have.been.called;
    });

    it('should not let pass to anonymous user', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse({
        spies: {
          unauthorized: true
        }
      });
      var callback = sinon.spy();

      isJudge(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(response.unauthorized).to.have.been.called;
    });
  });
});
