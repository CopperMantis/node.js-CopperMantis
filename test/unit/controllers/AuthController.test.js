var request = require('supertest');
var expect = require('chai').expect;

describe('controllers/AuthController', function() {

  before(function (done) {
    // TODO: move this promise chaining as fixture
    sails.models.user.create({
      username: 'participant102',
      password: 'dummy123',
      email: 'foo@bar.com'
    })
    .then(function () {
      sails.config.globals.rootUsername = 'ninja';
      sails.config.globals.rootPassword = 'h!dd3n';
    })
    .finally(done);
  });

  describe('.login()', function() {
    it('should return a token for root user [POST /v1/auth/login]', function (done) {
      request(sails.hooks.http.app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'ninja', password: 'h!dd3n' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body.token).to.exist.and.to.be.an('string');
          done();
        });
    });

    it('should return a token for a any registered user [POST /v1/auth/login]', function (done) {
      request(sails.hooks.http.app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'participant102', password: 'dummy123' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body.token).to.exist.and.to.be.an('string');
          done();
        });
    });

    it('should not allow to login any registered user with wrong password [POST /v1/auth/login]', function (done) {
      request(sails.hooks.http.app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'participant102', password: 'wrong-password' })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({message: 'Incorrect password'}, done);
    });

    it('should not allow to login any unregistered user [POST /v1/auth/login]', function (done) {
      request(sails.hooks.http.app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'nobody', password: 'doesntmatter' })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({message: 'User not found'}, done);
    });
  });

});
