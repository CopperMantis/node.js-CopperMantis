var chai = require('chai');
var sinonChai = require('sinon-chai');
var moment = require('moment');
var expect = chai.expect;
var httpMocks = require('../../helpers').factories.httpMocks;

chai.use(sinonChai);

describe('controllers/MatchController', function () {
  describe('.create()', function () {
    it('should return ok when recieves all required values and user id', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'the title',
          start: moment().toISOString(),
          end: moment().add(7, 'days').toISOString()
        },
        extra: {
          user: { id: 0 }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true
        }
      });

      sails.controllers.match.create(request, response)
        .then(function () {
          expect(response.ok).to.be.called;
          expect(response.ok.args[0][0]).to.be.an('object').with.property('message');
          done();
        });
    });

    it('should throw an error for missing user id', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'the title',
          start: moment().toISOString(),
          end: moment().add(7, 'days').toISOString()
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          negotiate: true
        }
      });

      sails.controllers.match.create(request, response)
        .then(function () {
          expect(response.negotiate).to.be.called;
          expect(response.negotiate.args[0][0]).to.be.an('object');
          done();
        });
    });

    it('should throw an error for missing "match" attribute', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'the title',
          start: moment().toISOString()
        },
        extra: {
          user: { id: 0 }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          negotiate: true
        }
      });

      sails.controllers.match.create(request, response)
        .then(function () {
          expect(response.negotiate).to.be.called;
          expect(response.negotiate.args[0][0]).to.be.an('object');
          done();
        });
    });
  });

  describe('.destroy()', function () {
    var matchId1;

    before(function (done) {
      sails.models.match.create({
        title: 'Contest 1',
        createdBy: 0,
        start: moment().toISOString(),
        end: moment().add(7, 'days').toISOString()
      })
        .then(function (record) {
          matchId1 = record.id;
        })
        .finally(done);
    });

    it('should return ok when it recieves an existent match\'s id as param', function (done) {
      var request = httpMocks.createRequest({
        method: 'DEL',
        params: {
          id: matchId1
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true
        }
      });

      sails.controllers.match.destroy(request, response)
        .then(function () {
          expect(response.ok).to.be.called;
          expect(response.ok.args[0][0]).to.be.an('object').with.property('message');
          done();
        });
    });

    it('should throw an error when it recieves a non existent match\'s id as param', function (done) {
      var request = httpMocks.createRequest({
        method: 'DEL',
        params: {
          id: '5632f833aab8e08c6d4b72cc'
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          negotiate: true
        }
      });

      sails.controllers.match.destroy(request, response)
        .then(function () {
          expect(response.negotiate).to.be.called;
          expect(response.negotiate.args[0][0]).to.exist;
          done();
        });
    });
  });
});
