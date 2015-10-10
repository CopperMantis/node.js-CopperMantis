var expect = require('chai').expect;

describe('models/Contest', function() {
  describe('.create()', function() {
    it('should create a "page" content type', function(done) {
      sails.models.content.create({
        title: 'The title',
        type: 'page',
        status: 'published',
        content: 'nothing relevant',
        owner: 0
      }).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        done();
      });
    });
    it('should create a "menu" content type', function(done) {
      sails.models.content.create({
        title: 'The label',
        type: 'menu',
        content: 'relative/url',
        owner: 0
      }).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        done();
      });
    });
    it('should create a "problem" content type', function(done) {
      sails.models.content.create({
        title: 'The uberly difficult problem',
        type: 'problem',
        status: 'published',
        content: '## Not really',
        owner: 0,
        meta: { value: 5 },
        attachment: [
          {
            in: ['input scenario 1', 'input scenario 2'],
            out: ['desired output 1', 'desired output 2']
          }
        ]
      }).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        done();
      });
    });
    it('should create a "solution" content type', function(done) {
      sails.models.content.create({
        title: 'The uberly difficult problem',
        type: 'solution',
        status: 'submited',
        content: 'codez?',
        owner: 0,
      }).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        done();
      });
    });
    it('should not allow to create a different content type', function(done) {
      sails.models.content.create({
        title: 'The title',
        type: 'failed',
        owner: 0
      }).exec(function(err, record) {
        expect(err).to.exist;
        expect(record).to.not.exist;
        done();
      });
    });
    it('should not allow to create content without owner', function(done) {
      sails.models.content.create({
        title: 'The title',
        type: 'page',
      }).exec(function(err, record) {
        expect(err).to.exist;
        expect(record).to.not.exist;
        done();
      });
    });
    it('should not allow to create content with an invalid ObjectId as owner', function(done) {
      sails.models.content.create({
        title: 'The title',
        type: 'page',
        owner: 'invalidID'
      }).exec(function(err, record) {
        expect(err).to.exist;
        expect(record).to.not.exist;
        done();
      });
    });
  });
});
