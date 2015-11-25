var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var httpMocks = require('node-mocks-http');

chai.use(sinonChai);

describe('policies/hasValidContentSlug', function() {

  describe('.hasValidContentSlug', function () {
    var hasValidContentSlug;

    before(function (done) {
      hasValidContentSlug = sails.hooks.policies.middleware.hasvalidcontentslug;
      done();
    });

    it('should let pass any request with "menu" slug', function () {
      var request = httpMocks.createRequest({
        params: {
          contentSlug: 'menu'
        }
      });
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      hasValidContentSlug(request, response, callback);
      expect(callback).to.have.been.called;
      expect(notFoundSpy).to.not.have.been.called;
    });

    it('should let pass any request with "page" slug', function () {
      var request = httpMocks.createRequest({
        params: {
          contentSlug: 'page'
        }
      });
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      hasValidContentSlug(request, response, callback);
      expect(callback).to.have.been.called;
      expect(notFoundSpy).to.not.have.been.called;
    });

    it('should let pass any request with "problem" slug', function () {
      var request = httpMocks.createRequest({
        params: {
          contentSlug: 'problem'
        }
      });
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      hasValidContentSlug(request, response, callback);
      expect(callback).to.have.been.called;
      expect(notFoundSpy).to.not.have.been.called;
    });

    it('should not let pass any request with invalid content slug', function () {
      var request = httpMocks.createRequest({
        params: {
          contentSlug: 'anything'
        }
      });
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      hasValidContentSlug(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(notFoundSpy).to.have.been.called.once;
    });

    it('should not let pass any request without content slug', function () {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();
      var callback = sinon.spy();
      var notFoundSpy = sinon.spy();
      response.notFound = notFoundSpy;

      hasValidContentSlug(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(notFoundSpy).to.have.been.called;
    });
  });
});
