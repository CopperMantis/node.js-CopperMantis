var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('services/Auth', function() {

  before(function (done) {
    sails.models.user.create({
      username: 'participant101',
      password: 'dummy123',
      email: 'foo@bar.com'
    }).then(function () {
      return sails.models.user.create({
        username: 'judge101',
        password: 'dummy123',
        email: 'foojudge@bar.com',
        role: 'judge'
      });
    }).then(function () {
      return sails.models.user.create({
        username: 'admin101',
        password: 'dummy123',
        email: 'fooadmin@bar.com',
        role: 'admin'
      });
    }).then(function () {
      sails.config.globals.rootUsername = 'ninja';
      sails.config.globals.rootPassword = 'h!dd3n';
    })
    .finally(done);
  });

  describe('.attemptLogin', function () {
    it('should recognize that root user is trying to login', function (done) {
      var authService = sails.services.auth;
      return expect(authService.attemptLogin({ username: 'ninja', password: 'h!dd3n' }))
              .to.be.fulfilled
              .and.to.eventually.have.property('token').that.is.a('string')
              .and.notify(done);
    });
    it('should recognize a competitor with its own username and password', function (done) {
      var authService = sails.services.auth;
      return expect(authService.attemptLogin({ username: 'participant101', password: 'dummy123' }))
              .to.be.fulfilled
              .and.to.eventually.have.property('token').that.is.a('string')
              .and.notify(done);
    });
    it('should recognize a judge with its own username and password', function (done) {
      var authService = sails.services.auth;
      return expect(authService.attemptLogin({ username: 'judge101', password: 'dummy123' }))
              .to.be.fulfilled
              .and.to.eventually.have.property('token').that.is.a('string')
              .and.notify(done);
    });
    it('should recognize a admin with its own username and password', function (done) {
      var authService = sails.services.auth;
      return expect(authService.attemptLogin({ username: 'admin101', password: 'dummy123' }))
              .to.be.fulfilled
              .and.to.eventually.have.property('token').that.is.a('string')
              .and.notify(done);
    });
    it('should reject the access to any registered user with incorrect password', function (done) {
      var authService = sails.services.auth;
      return expect(authService.attemptLogin({ username: 'participant101', password: 'doh!' }))
              .to.be.rejected
              .and.to.eventually.have.property('error', 'Incorrect password')
              .and.notify(done);
    });
    it('should reject the access to any unregistered user', function (done) {
      var authService = sails.services.auth;
      return expect(authService.attemptLogin({ username: 'nobody', password: 'doesntmatter' }))
              .to.be.rejected
              .and.to.eventually.have.property('error', 'User not found')
              .and.notify(done);
    });
  });

  describe('.verifyToken()', function () {
    var sharedToken;

    before(function (done) {
      sails.services.auth.attemptLogin({ username: 'ninja', password: 'h!dd3n' })
      .then(function (result) {
        sharedToken = result.token;
      })
      .finally(done);
    });

    it('should return an access object from a valid token', function (done) {
      sails.services.auth.verifyToken(sharedToken)
      .then(function (access) {
        expect(access).to.have.property('id', 0);
        expect(access).to.have.property('role', 'root');
        expect(access).to.have.property('exp').that.is.gt(access.iat);
        expect(access).to.have.property('iat');
      })
      .finally(done);
    });

    it('should reject the access to any unregistered user', function (done) {
      var authService = sails.services.auth;
      authService.verifyToken('foo').then(function (access) {
        expect(access).to.not.exist;
      })
      .catch(function (error) {
        expect(error).to.be.instanceof(Error);
        expect(error).to.have.property('name').that.is.a('string');
        expect(error).to.have.property('message').that.is.a('string');
      })
      .finally(done);
    });

  });
});
