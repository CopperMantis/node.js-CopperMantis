var expect = require('chai').expect;
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var moment = require('moment');

describe('controllers/MatchController', function() {

  describe('.create()', function() {
    it('should call "req.ok" when recieves all required values and user id', function (done) {
      var request  = httpMocks.createRequest({
          method: 'POST',
          body: {
            title: 'the title',
            start: moment().toISOString(),
            end: moment().add(7, 'days').toISOString()
          }
      });
      request.user = { id: 0 };
      var response = httpMocks.createResponse();
      var okSpy = sinon.spy();
      response.ok = okSpy;

      sails.controllers.match.create(request, response)
      .then(function () {
        expect(okSpy).to.be.called;
        expect(okSpy.args[0][0]).to.be.an('object').with.property('message');
        done();
      });
    });

    it('should throw an error for missing user id', function (done) {
      var request  = httpMocks.createRequest({
          method: 'POST',
          body: {
            title: 'the title',
            start: moment().toISOString(),
            end: moment().add(7, 'days').toISOString()
          }
      });
      var response = httpMocks.createResponse();
      var negotiateSpy = sinon.spy();
      response.negotiate = negotiateSpy;

      sails.controllers.match.create(request, response)
      .then(function () {
        expect(negotiateSpy).to.be.called;
        expect(negotiateSpy.args[0][0]).to.be.an('object');
        done();
      });
    });

    it('should throw an error for missing "match" attribute', function (done) {
      var request  = httpMocks.createRequest({
          method: 'POST',
          body: {
            title: 'the title',
            start: moment().toISOString(),
          }
      });
      request.user = { id: 0 };
      var response = httpMocks.createResponse();
      var negotiateSpy = sinon.spy();
      response.negotiate = negotiateSpy;

      sails.controllers.match.create(request, response)
      .then(function () {
        expect(negotiateSpy).to.be.called;
        expect(negotiateSpy.args[0][0]).to.be.an('object');
        done();
      });
    });
  });

  describe('.destroy()', function() {
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

    it('should call "req.ok" when it recieves an existent match\'s id as param', function (done) {
      var request  = httpMocks.createRequest({
          method: 'DEL',
          params: {
            id: matchId1
          }
      });
      var response = {};
      var okSpy = sinon.spy();
      response.ok = okSpy;

      sails.controllers.match.destroy(request, response)
      .then(function () {
        expect(okSpy).to.be.called;
        expect(okSpy.args[0][0]).to.be.an('object').with.property('message');
        done();
      });
    });

    it('should throw an error when it recieves a nonexistent match\'s id as param', function (done) {
      var request  = httpMocks.createRequest({
          method: 'DEL',
          params: {
            id: '5632f833aab8e08c6d4b72cc',
          }
      });
      var response = {};
      var negotiateSpy = sinon.spy();
      response.negotiate = negotiateSpy;

      sails.controllers.match.destroy(request, response)
      .then(function () {
        expect(negotiateSpy).to.be.called;
        expect(negotiateSpy.args[0][0]).to.exist;
        done();
      });
    });


  });
});
