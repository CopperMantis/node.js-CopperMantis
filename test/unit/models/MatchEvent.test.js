var expect = require('chai').expect;

describe('models/MatchEvent', function() {
	describe('.create', function () {
		it('should create an MatchEvent',function (done) {
			sails.models.matchevent.create({
				owner: 0, // root user
				type: 'solution_submition'
			}).exec(function (err, record) {
				expect(err).to.not.exist;
				expect(record).to.exist;
				expect(record.owner).to.exist.to.equal('0');
				expect(record.type).to.exist;
				expect(record.createdAt).to.exist;
				expect(record.updatedAt).to.not.exist;
				done();
			});
		});
		it('should not allow to create a MatchEvent without owner', function (done) {
			sails.models.matchevent.create({
				type: 'solution_submition'
			}).exec(function (err, record) {
				expect(err).to.exist;
				done();
			});
		});
		it('should not allow to create a MatchEvent with an Invalid ObjectId as owner', function (done) {
			sails.models.matchevent.create({
				owner: 'invalid-id',
				type: 'solution_submition'
			}).exec(function (err, record) {
				expect(err).to.exist;
				done();
			});
		});
		it('should not allow to create a MatchEvent without type', function (done) {
			sails.models.matchevent.create({
				owner: 0
			}).exec(function (err, record) {
				expect(err).to.exist;
				done();
			});
		});
	});
});
