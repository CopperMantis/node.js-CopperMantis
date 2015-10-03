var sails = require('sails');
var expect = require('chai').expect;

describe('models/User', function() {
  describe('.create()', function() {
    it('should create a user as "participant" with hashed password', function(done) {
      sails.models.user.create({
        username: 'testuser',
        password: 'dummy123',
        email: 'some@body.com'
      }).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        expect(record.password).to.not.equal('dummy123');
        done();
      });
    });
  });
  describe('.update()', function() {
    it('should update with hashed password', function(done) {
      sails.models.user.update(
        { username: 'testuser' },
        { email: 'some123@body.com' }
      ).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        expect(record[0].email).to.equal('some123@body.com');
        expect(record[0].password).to.not.equal('dummy123');
        done();
      });
    });
  });
});
