var request = require('supertest');
var expect = require('chai').expect;
var moment = require('moment');

describe('controllers/MatchController', function() {
  var rootToken;
  var adminToken;
  var judgeToken;

  before(function (done) {
    sails.config.globals.rootUsername = 'ninja';
    sails.config.globals.rootPassword = 'h!dd3n';

    sails.models.user.create({
      username: 'admin102',
      password: 'dummy123',
      email: 'foo@bar.com',
      role: 'admin'
    })
    .then(function () {
      return sails.models.user.create({
        username: 'judge102',
        password: 'dummy123',
        email: 'foo@bar.com',
        role: 'judge'
      });
    })
    .then(function () {
      return sails.services.auth.attemptLogin({username: 'ninja', password: 'h!dd3n'});
    })
    .then(function (response) {
      rootToken = 'Bearer ' + response.token;
      return sails.services.auth.attemptLogin({username: 'admin102', password: 'dummy123'});
    })
    .then(function (response) {
      adminToken = 'Bearer ' + response.token;
      return sails.services.auth.attemptLogin({username: 'judge102', password: 'dummy123'});
    })
    .then(function (response) {
      judgeToken = 'Bearer ' + response.token;
    })
    .finally(done);
  });

  describe('.find', function () {

    before(function (done) {
      sails.models.match.create({
          title: 'Contest 1',
          createdBy: 0,
          start: moment().toISOString(),
          end: moment().add(7, 'days').toISOString()
        })
        .then(function () {
          return sails.models.match.create({
            title: 'Contest 2',
            createdBy: 0,
            start: moment().toISOString(),
            end: moment().add(7, 'days').toISOString()
          });
        })
        .finally(done);
    });

    after(function (done) {
      sails.models.match.drop(function (err) {
        done();
      });
    });

    it('should allow anonymous users to list every match in the platform [GET /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .get('/v1/match')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist
            .and.to.be.an('array');
          // Describe first one
          expect(res.body[0]).to.exist
            .and.to.be.an('object')
            .and.to.have.property('title').and.to.be.a('string');
          expect(res.body[0]).to.exist
            .and.to.have.property('createdBy', '0');
          expect(res.body[0]).to.exist
            .and.to.have.property('createdAt').and.to.be.a('string');
          expect(res.body[0]).to.exist
            .and.to.have.property('updatedAt').and.to.be.a('string');
          expect(res.body[0]).to.exist
            .and.to.have.property('start').and.to.be.a('string');
          expect(res.body[0]).to.exist
            .and.to.have.property('end').and.to.be.a('string');
          // Check if second one exists
          expect(res.body[1]).to.exist
            .and.to.be.an('object');
          done();
        });
    });

    it('should allow authenticated users to list every match in the platform [GET /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .get('/v1/match')
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist
            .and.to.be.an('array');
          // Describe first one
          expect(res.body[0]).to.exist
            .and.to.be.an('object');
          // Check if second one exists
          expect(res.body[1]).to.exist
            .and.to.be.an('object');
          done();
        });
    });
  });

  describe('.findOne', function () {
    var matchId;

    before(function (done) {
      sails.models.match.create({
          title: 'Contest 1',
          createdBy: 0,
          start: moment().toISOString(),
          end: moment().add(7, 'days').toISOString()
        })
        .then(function (record) {
          matchId = record.id;
        })
        .finally(done);
    });

    after(function (done) {
      sails.models.match.drop(function (err) {
        done();
      });
    });

    it('should allow anonymous users to check an specific match [GET /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .get('/v1/match/' + matchId)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist
            .and.to.be.an('object')
            .and.to.have.property('title').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('createdBy', '0');
          expect(res.body).to.exist
            .and.to.have.property('createdAt').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('updatedAt').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('start').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('end').and.to.be.a('string');
          done();
        });
    });

    it('should allow authenticated users to check a specific match [GET /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .get('/v1/match/' + matchId)
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist
            .and.to.be.an('object')
            .and.to.have.property('title').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('createdBy', '0');
          expect(res.body).to.exist
            .and.to.have.property('createdAt').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('updatedAt').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('start').and.to.be.a('string');
          expect(res.body).to.exist
            .and.to.have.property('end').and.to.be.a('string');
          done();
        });
    });
  });

  describe('.create', function () {

    after(function (done) {
      sails.models.match.drop(function (err) {
        done();
      });
    });

    it('should allow root user to create a match [POST /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .post('/v1/match/')
        .set('Accept', 'application/json')
        .set('Authorization', rootToken)
        .send({
            title: 'Contest X1',
            start: moment().toISOString(),
            end: moment().add(7, 'days').toISOString()
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(200);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });

    it('should allow an admin user to create a match [POST /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .post('/v1/match/')
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .send({
            title: 'Contest X2',
            start: moment().toISOString(),
            end: moment().add(7, 'days').toISOString()
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(200);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });

    it('should not allow to any non admin user to create a match [POST /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .post('/v1/match/')
        .set('Accept', 'application/json')
        .set('Authorization', judgeToken)
        .send({
            title: 'Contest X3',
            start: moment().toISOString(),
            end: moment().add(7, 'days').toISOString()
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(403);
          expect(res.body).to.exist.and.to.have.property('message');
          done();
        });
    });

    it('should not allow to anonymous user to create a match [POST /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .post('/v1/match/')
        .set('Accept', 'application/json')
        .send({
            title: 'Contest X3',
            start: moment().toISOString(),
            end: moment().add(7, 'days').toISOString()
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.exist.and.to.have.property('message');
          done();
        });
    });

    it('should respond with 400 status code on Model Validation error [POST /v1/match]',function (done) {
      request(sails.hooks.http.app)
        .post('/v1/match/')
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .send({
            title: 'Contest X2',
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(400);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });
  });

  describe('.update', function () {
    var matchId;

    before(function (done) {
      sails.models.match.create({
          title: 'Contest 1',
          createdBy: 0,
          start: moment().toISOString(),
          end: moment().add(7, 'days').toISOString()
        })
        .then(function (record) {
          matchId = record.id;
        })
        .finally(done);
    });

    after(function (done) {
      sails.models.match.drop(function (err) {
        done();
      });
    });

    it('should allow root user to update a match [PUT /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .put('/v1/match/' + matchId)
        .set('Accept', 'application/json')
        .set('Authorization', rootToken)
        .send({
            title: 'Contest X1'
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(200);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });

    it('should allow an admin user to create a match [PUT /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .put('/v1/match/' + matchId)
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .send({
            title: 'Contest X2'
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(200);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });

    it('should not allow to any non admin user to create a match [PUT /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .put('/v1/match/' + matchId)
        .set('Accept', 'application/json')
        .set('Authorization', judgeToken)
        .send({
            title: 'Contest X3'
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(403);
          expect(res.body).to.exist.and.to.have.property('message');
          done();
        });
    });

    it('should not allow to anonymous user to create a match [PUT /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .put('/v1/match/' + matchId)
        .set('Accept', 'application/json')
        .send({
            title: 'Contest X4'
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.exist.and.to.have.property('message');
          done();
        });
    });

    it('should respond with 400 status code on Model Validation error [PUT /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .put('/v1/match/' + matchId)
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .send({
            createdBy: 'invalid'
          })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(400);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });
  });

  describe('.delete', function () {
    var matchId1;
    var matchId2;
    var matchId3;

    before(function (done) {
      sails.models.match.create({
          title: 'Contest 1',
          createdBy: 0,
          start: moment().toISOString(),
          end: moment().add(7, 'days').toISOString()
        })
        .then(function (record) {
          matchId1 = record.id;
          return sails.models.match.create({
              title: 'Contest 2',
              createdBy: 0,
              start: moment().toISOString(),
              end: moment().add(7, 'days').toISOString()
            });
        })
        .then(function (record) {
          matchId2 = record.id;
          return sails.models.match.create({
              title: 'Contest 3',
              createdBy: 0,
              start: moment().toISOString(),
              end: moment().add(7, 'days').toISOString()
            });
        })
        .then(function (record) {
          matchId3 = record.id;
        }).finally(done);
    });

    after(function (done) {
      sails.models.match.drop(function (err) {
        done();
      });
    });

    it('should allow root user to update a match [DEL /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .delete('/v1/match/' + matchId1)
        .set('Accept', 'application/json')
        .set('Authorization', rootToken)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(200);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });

    it('should allow an admin user to create a match [DEL /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .delete('/v1/match/' + matchId2)
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(200);
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          done();
        });
    });

    it('should not allow to any non admin user to create a match [DEL /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .delete('/v1/match/' + matchId3)
        .set('Accept', 'application/json')
        .set('Authorization', judgeToken)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(403);
          expect(res.body).to.exist.and.to.have.property('message');
          done();
        });
    });

    it('should not allow to anonymous user to create a match [DEL /v1/match/:id]',function (done) {
      request(sails.hooks.http.app)
        .delete('/v1/match/' + matchId3)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.exist.and.to.have.property('message');
          done();
        });
    });
  });
});
