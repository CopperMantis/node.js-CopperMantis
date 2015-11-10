var expect = require('chai').expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');

describe('policies/hasValidContentSlug', function() {

  describe('.hasValidContentSlug', function () {
    var hasValidContentSlug;

    before(function (done) {
      hasValidContentSlug = sails.hooks.policies.middleware.hasvalidcontentslug;
      done();
    });

    it('should let pass any request with "menu" slug', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      request.contentSlug = 'menu';

      hasValidContentSlug(request, response, callback);
      expect(callback).to.be.called;
      expect(notFoundSpy).to.not.be.called;
      done();
    });

    it('should let pass any request with "page" slug', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      request.contentSlug = 'page';

      hasValidContentSlug(request, response, callback);
      expect(callback).to.be.called;
      expect(notFoundSpy).to.not.be.called;
      done();
    });

    it('should let pass any request with "problem" slug', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      request.contentSlug = 'problem';

      hasValidContentSlug(request, response, callback);
      expect(callback).to.be.called;
      expect(notFoundSpy).to.not.be.called;
      done();
    });

    it('should NOT let pass any request without content slug', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      hasValidContentSlug(request, response, callback);
      expect(callback).to.not.be.called;
      expect(notFoundSpy).to.be.called;
      done();
    });

    it('should NOT let pass any request with invalid content slug', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      request.contentSlug = 'anything';

      hasValidContentSlug(request, response, callback);
      expect(callback).to.not.be.called;
      expect(notFoundSpy).to.be.called;
      done();
    });

  });
});
