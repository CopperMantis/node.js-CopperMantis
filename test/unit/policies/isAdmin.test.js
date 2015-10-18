var expect = require('chai').expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');

describe('policies/isAdmin', function() {

  describe('.isAdmin', function () {
    var isAdmin;

    before(function (done) {
      isAdmin = sails.hooks.policies.middleware.isadmin;
      done();
    });

    it('should let pass to any user with admin role', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var unauthorizedSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      request.user = {
        id: 'doesnt matter at all',
        role: 'admin'
      };

      isAdmin(request, response, callback);
      expect(callback).to.be.called;
      expect(unauthorizedSpy).to.not.be.called;
      done();
    });

    it('should let pass the root user', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var unauthorizedSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      request.user = {
        id: 0,
        role: 'root'
      };

      isAdmin(request, response, callback);
      expect(callback).to.be.called;
      expect(unauthorizedSpy).to.not.be.called;
      done();
    });

    it('should not let pass to any other role', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var unauthorizedSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      request.user = {
        id: 'some-mongo-id',
        role: 'judge'
      };

      isAdmin(request, response, callback);
      expect(callback).to.not.be.called;
      expect(unauthorizedSpy).to.be.called;
      done();
    });

    it('should not let pass to anonymous user', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var unauthorizedSpy = sinon.spy();
      response.unauthorized = unauthorizedSpy;

      isAdmin(request, response, callback);
      expect(callback).to.not.be.called;
      expect(unauthorizedSpy).to.be.called;
      done();
    });
  });
});
