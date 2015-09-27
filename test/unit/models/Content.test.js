//-- test/unit/models/Contest.test.js
require('sails-test-helper');

describe(TEST_NAME, function() {
  describe('.create()', function() {
    it('should be successful', function(done) {
      sails.models.Content.create().exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        done();
      });
    });
  });
});
