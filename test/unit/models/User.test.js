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
        expect(record.createdAt).to.exist;
        expect(record.updatedAt).to.exist;
        expect(record.password).to.not.equal('dummy123');
        done();
      });
    });
    it('should not allow to create a user with a repeated username', function(done) {
      sails.models.user.create({
        username: 'testuser',
        password: 'dummy123',
        email: 'some@body.com'
      }).then(function () {
        return sails.models.user.create({
          username: 'testuser',
          password: 'dummy123',
          email: 'anyother@email.com'
        });
      }).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });
    it('should not allow to create a user as "root"', function(done) {
      sails.models.user.create({
        username: 'testuser',
        password: 'dummy123',
        email: 'some@body.com',
        role: 'root'
      }).exec(function(err, record) {
        expect(err).to.exist;
        expect(record).to.not.exist;
        done();
      });
    });
    afterEach(function (done) {
      sails.models.user.destroy({username: 'testuser'})
      .then(function () {
        done();
      });
    });
  });

  describe('.update()', function() {
    before(function (done) {
      sails.models.user.create({
        username: 'testuser',
        password: 'dummy123',
        email: 'some@body.com'
      })
      .then(function () {
        done();
      });
    });
    it('should update any user metadata and hash its password', function(done) {
      sails.models.user.update(
        { username: 'testuser' },
        { email: 'some123@body.com', password: 'dummy1234' }
      ).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        expect(record[0].email).to.equal('some123@body.com');
        expect(record[0].password).to.not.equal('dummy1234');
        done();
      });
    });

    after(function (done) {
      sails.models.user.destroy({username: 'testuser'})
      .then(function () {
        done();
      });
    });
  });

});
