var request = require('supertest');
var expect = require('chai').expect;

describe('/v1/auth', function() {

  describe('[POST] /login', function() {

    before(function (done) {
      // TODO: move this promise chaining as fixture
      sails.models.user.create({
        username: 'competitor102',
        password: 'dummy123',
        email: 'foo@bar.com'
      })
      .then(function () {
        sails.config.globals.rootUsername = 'ninja';
        sails.config.globals.rootPassword = 'h!dd3n';
      })
      .finally(done);
    });


    it('should return a token for root user', function (done) {
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

    it('should return a token for a any registered user', function (done) {
      request(sails.hooks.http.app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'competitor102', password: 'dummy123' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body.token).to.exist.and.to.be.an('string');
          done();
        });
    });

    it('should not allow to login any registered user with wrong password', function (done) {
      request(sails.hooks.http.app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'competitor102', password: 'wrong-password' })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({message: 'Incorrect password'}, done);
    });

    it('should not allow to login any unregistered user', function (done) {
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
