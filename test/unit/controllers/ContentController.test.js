var chai = require('chai');
var moment = require('moment');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var helpers = require('../../helpers');
var httpMocks = helpers.factories.httpMocks;
var matchGenerator = helpers.factories.matchGenerator;
var contentGenerator = helpers.factories.contentGenerator;

chai.use(sinonChai);

describe('controllers/ContentController', function () {
  describe('.create()', function () {
    after(function (done) {
      sails.models.content.drop(function () {
        done();
      });
    });

    it('should accept the request when recieves all required values', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'Page',
          content: 'Waiting for Lorem ipsum?'
        },
        extra: {
          user: { id: 0 },
          meta: { type: 'page' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.create(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('object').with.property('message');
          expect(response.negotiate).to.not.have.been.called;
          done();
        });
    });

    it('should reject the request when the user id is not sent', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'Page',
          content: 'Waiting for Lorem ipsum?'
        },
        extra: {
          meta: { type: 'page' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.create(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.have.been.called;
          expect(response.negotiate.args[0][0]).to.be.an('object').and.be.instanceof(Error);
          done();
        });
    });

    it('should reject the request when the content slug is not sent', function (done) {
      var request = httpMocks.createRequest({
        method: 'POST',
        body: {
          title: 'Page',
          content: 'Waiting for Lorem ipsum?'
        },
        extra: {
          user: { id: 0 }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.create(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.have.been.called;
          expect(response.negotiate.args[0][0]).to.be.an('object').and.be.instanceof(Error);
          done();
        });
    });
  });

  describe('.find()', function () {
    before(function (done) {
      sails.models.content.create([
        contentGenerator.randomPage(),
        contentGenerator.randomPage(),
        contentGenerator.randomMenu()
      ])
      .catch(function (reason) {
        sails.log.debug(reason);
      })
      .finally(done);
    });

    after(function (done) {
      sails.models.content.drop(function () {
        done();
      });
    });

    it('should respond with an array of content items', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        extra: {
          meta: {
            type: 'page'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.find(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('array');
          expect(response.negotiate).to.not.have.been.called;
          done();
        });
    });

    it('should respond with an empty array if the collection is empty', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        extra: {
          meta: {
            type:
            'problem'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.find(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('array').and.to.have.length(0);
          expect(response.negotiate).to.not.have.been.called;
          done();
        });
    });
  });

  describe('.findOne()', function () {
    var pageId;
    var menuId;

    before(function (done) {
      sails.models.content.create(contentGenerator.randomPage())
      .then(function (record) {
        pageId = record.id;
        return sails.models.content.create(contentGenerator.randomMenu());
      }).then(function (record) {
        menuId = record.id;
      }).catch(function (reason) {
        sails.log.debug(reason);
      })
      .finally(done);
    });

    after(function (done) {
      sails.models.content.drop(function () {
        done();
      });
    });

    it('should respond with only one content item according the content slug and its id', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          id: pageId
        },
        extra: {
          meta: {
            type: 'page'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.findOne(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('object');
          expect(response.negotiate).to.not.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should respond with 404 if the content id does not belong to content slug collection', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          id: pageId
        },
        extra: {
          meta: {
            type: 'menu'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.findOne(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should reject the request if a wrong id is provided', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          id: pageId + '123'
        },
        extra: {
          meta: {
            type: 'page'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.findOne(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.have.been.called;
          done();
        })
        .catch(done);
    });
  });

  describe('.findByMatch()', function () {
    var matchId1;
    var matchId2;

    before(function (done) {
      sails.models.match.create([
        matchGenerator.random(),
        matchGenerator.random()
      ])
      .then(function (records) {
        matchId1 = records[0].id;
        matchId2 = records[1].id;

        return sails.models.content.create([
          contentGenerator.randomPage({match: matchId1}),
          contentGenerator.randomPage({match: matchId1}),
          contentGenerator.randomMenu({match: matchId1})
        ]);
      })
      .catch(function (reason) {
        sails.log.debug(reason);
      })
      .finally(done);
    });

    after(function (done) {
      sails.models.content.drop(function () {
        sails.models.match.drop(function () {
          done();
        });
      });
    });

    it('should respond with an content array associated to the given matchId', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          matchId: matchId1
        },
        extra: {
          meta: {
            type: 'page'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.findByMatch(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('array').and.to.have.length(2);
          expect(response.negotiate).to.not.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should respond with an empty array if the given match does not have any content', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          matchId: matchId2
        },
        extra: {
          meta: {
            type: 'page'
          }
        }
      });
      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.findByMatch(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('array').and.to.have.length(0);
          expect(response.negotiate).to.not.have.been.called;
          done();
        })
        .catch(done);
    });

    // FIXME: This should be a 404 error but adds an extra validation
    it('should respond with an empty array if the match does not exists', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          matchId: 0
        },
        extra: {
          meta: {
            type: 'page'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.findByMatch(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('array').and.to.have.length(0);
          expect(response.negotiate).to.not.have.been.called;
          done();
        })
        .catch(done);
    });
  });

  describe('.findOneByMatch()', function () {
    var matchId1;
    var matchId2;
    var contentId1;
    var contentId2;
    var contentId3;

    before(function (done) {
      sails.models.match.create([
        matchGenerator.random(),
        matchGenerator.random()
      ])
      .then(function (records) {
        matchId1 = records[0].id;
        matchId2 = records[1].id;

        return sails.models.content.create([
          contentGenerator.randomPage({match: matchId1}),
          contentGenerator.randomMenu({match: matchId1}),
          contentGenerator.randomPage({match: matchId2})
        ]);
      })
      .then(function (records) {
        contentId1 = records[0].id;
        contentId2 = records[1].id;
        contentId3 = records[2].id;
      })
      .catch(function (reason) {
        sails.log.debug(reason);
      })
      .finally(done);
    });

    after(function (done) {
      sails.models.content.drop(function () {
        sails.models.match.drop(function () {
          done();
        });
      });
    });

    it('should respond with a content item associated to the given matchId and contentId', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          matchId: matchId1,
          id: contentId1
        },
        extra: {
          meta: {
            type: 'page'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.findOneByMatch(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('object');
          expect(response.negotiate).to.not.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should respond with notFound if the given matchId and contentId are not associated', function (done) {
      var request = httpMocks.createRequest({
        method: 'GET',
        params: {
          matchId: matchId2,
          id: contentId1
        },
        extra: {
          meta: {
            type: 'page'
          }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          notFound: true,
          negotiate: true
        }
      });

      sails.controllers.content.findOneByMatch(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.not.have.been.called;
          expect(response.notFound).to.have.been.called;
          done();
        })
        .catch(done);
    });
  });

  describe('.update()', function () {
    var contentId1;
    var contentId2;

    before(function (done) {
      sails.models.content.create([
        contentGenerator.randomPage(),
        contentGenerator.randomPage()
      ])
      .then(function (records) {
        contentId1 = records[0].id;
        contentId2 = records[1].id;
      })
      .catch(function (reason) {
        sails.log.debug(reason);
      })
      .finally(done);
    });

    after(function (done) {
      sails.models.content.drop(function () {
        done();
      });
    });

    it('should update a content item when recieves all required values', function (done) {
      var request = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: contentId1
        },
        body: {
          title: 'New title',
          content: 'New content'
        },
        extra: {
          user: { id: 0 },
          meta: { type: 'page' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          negotiate: true
        }
      });

      sails.controllers.content.update(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.ok.args[0][0]).to.be.an('object').with.property('title', 'New title');
          expect(response.ok.args[0][0]).to.be.an('object').with.property('content', 'New content');
          expect(response.negotiate).to.not.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should reject any request with an invalid value', function (done) {
      var request = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: contentId2
        },
        body: {
          title: 'New title',
          content: 'This update has to fail',
          type: 'foobar'
        },
        extra: {
          user: { id: 0 },
          meta: { type: 'page' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          notFound: true,
          negotiate: true
        }
      });

      sails.controllers.content.update(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.notFound).to.not.have.been.called;
          expect(response.negotiate).to.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should reject any request with incorrect content id', function (done) {
      var request = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: contentId1 + '123'
        },
        body: {
          title: 'New title',
          content: 'New content'
        },
        extra: {
          user: { id: 0 },
          meta: { type: 'page' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          notFound: true,
          negotiate: true
        }
      });

      sails.controllers.content.update(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.not.have.been.called;
          expect(response.notFound).to.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should reject any request with content id which does not belong to the given content type', function (done) {
      var request = httpMocks.createRequest({
        method: 'PUT',
        params: {
          id: contentId2
        },
        body: {
          title: 'New title',
          content: 'New content'
        },
        extra: {
          user: { id: 0 },
          meta: { type: 'menu' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          notFound: true,
          negotiate: true
        }
      });

      sails.controllers.content.update(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.not.have.been.called;
          expect(response.notFound).to.have.been.called;
          done();
        })
        .catch(done);
    });
  });

  describe('.destroy()', function () {
    var contentId1;
    var contentId2;
    var contentId3;

    before(function (done) {
      sails.models.content.create([
        contentGenerator.randomPage(),
        contentGenerator.randomPage(),
        contentGenerator.randomMenu()
      ])
      .then(function (records) {
        contentId1 = records[0].id;
        contentId2 = records[1].id;
        contentId3 = records[2].id;
      })
      .catch(function (reason) {
        sails.log.debug(reason);
      })
      .finally(done);
    });

    after(function (done) {
      sails.models.content.drop(function () {
        done();
      });
    });

    it('should delete any resource with the given id', function (done) {
      var request = httpMocks.createRequest({
        method: 'DELETE',
        params: {
          id: contentId1
        },
        extra: {
          meta: { type: 'page' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          notFound: true,
          negotiate: true
        }
      });

      sails.controllers.content.destroy(request, response)
        .then(function () {
          expect(response.ok).to.have.been.called;
          expect(response.negotiate).to.not.have.been.called;
          expect(response.notFound).to.not.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should reject any delete request for unexistent resource', function (done) {
      var request = httpMocks.createRequest({
        method: 'DELETE',
        params: {
          id: contentId1
        },
        extra: {
          meta: { type: 'page' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          notFound: true,
          negotiate: true
        }
      });

      sails.controllers.content.destroy(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.not.have.been.called;
          expect(response.notFound).to.have.been.called;
          done();
        })
        .catch(done);
    });

    it('should reject any delete request for a resource id that does not belong to the given resource type', function (done) {
      var request = httpMocks.createRequest({
        method: 'DELETE',
        params: {
          id: contentId2
        },
        extra: {
          meta: { type: 'menu' }
        }
      });

      var response = httpMocks.createResponse({
        spies: {
          ok: true,
          notFound: true,
          negotiate: true
        }
      });

      sails.controllers.content.destroy(request, response)
        .then(function () {
          expect(response.ok).to.not.have.been.called;
          expect(response.negotiate).to.not.have.been.called;
          expect(response.notFound).to.have.been.called;
          done();
        })
        .catch(done);
    });

    // XXX: I don't have any idea how to reproduce an exception for Waterline.destroy()
  });
});
