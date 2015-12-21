var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var httpMocks = require('../../helpers').factories.httpMocks;

chai.use(sinonChai);

describe('policies/isAdmin', function() {

  describe('.isAdmin', function () {
    var isAdmin;

    before(function () {
      isAdmin = sails.hooks.policies.middleware.isadmin;
    });

    it('should let pass to any user with admin role', function () {

      var request = httpMocks.createRequest({
        extra: {
          user: {
            id: 'doesnt matter at all',
            role: 'admin'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          forbidden: true
        }
      });
      var callback = sinon.spy();

      isAdmin(request, response, callback);
      expect(callback).to.have.been.called;
      expect(response.forbidden).to.not.have.been.called;
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

      isAdmin(request, response, callback);
      expect(callback).to.have.been.called;
      expect(response.forbidden).to.not.have.been.called;
    });

    it('should not let pass to any other role', function () {

      var request = httpMocks.createRequest({
        extra: {
          user: {
            id: 'some-mongo-id',
            role: 'judge'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          forbidden: true
        }
      });
      var callback = sinon.spy();


      isAdmin(request, response, callback);
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

      isAdmin(request, response, callback);
      expect(callback).to.not.have.been.called;
      expect(response.unauthorized).to.have.been.called;
      expect(response.unauthorized.args[0][0]).to.exist;
    });
  });
});
