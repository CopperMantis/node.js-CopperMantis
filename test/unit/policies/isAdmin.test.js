var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var httpMocks = require('node-mocks-http');

chai.use(sinonChai);

describe('policies/isAdmin', function() {

  describe('.isAdmin', function () {
    var isAdmin;

    before(function () {
      isAdmin = sails.hooks.policies.middleware.isadmin;
    });

    it('should let pass to any user with admin role', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var forbiddenSpy = sinon.spy();
      response.forbidden = forbiddenSpy;

      request.user = {
        id: 'doesnt matter at all',
        role: 'admin'
      };

      isAdmin(request, response, callback);
      expect(callback).to.have.been.called;
      expect(forbiddenSpy).to.not.have.been.called;
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

      isAdmin(request, response, callback);
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
        role: 'judge'
      };

      isAdmin(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(forbiddenSpy).to.have.been.called;
    });

    it('should not let pass to anonymous user', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var unauthorizedSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      isAdmin(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(unauthorizedSpy).to.have.been.called;
    });
  });
});
