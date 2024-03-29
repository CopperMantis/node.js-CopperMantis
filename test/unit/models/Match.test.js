var moment = require('moment');
var expect = require('chai').expect;

describe('models/Match', function () {
  describe('.create()', function () {
    after(function (done) {
      sails.models.match.drop(function () {
        done();
      });
    });

    it('should create a Match with "scheduled" default status', function (done) {
      sails.models.match.create({
        title: 'TestContest',
        createdBy: 0,
        start: moment().toISOString(),
        end: moment().add(7, 'days').toISOString()
      }).exec(function (err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        expect(record.title).to.exist;
        expect(record.start).to.exist;
        expect(record.end).to.exist;
        expect(record.status).to.exist.to.equal('scheduled');
        expect(record.createdAt).to.exist;
        expect(record.updatedAt).to.exist;
        done();
      });
    });
  });
});
