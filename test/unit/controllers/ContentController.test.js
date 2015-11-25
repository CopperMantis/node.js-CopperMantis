// var expect = require('chai').expect;
// var sinon = require('sinon');
// var httpMocks = require('node-mocks-http');
// var moment = require('moment');
//
// describe('controllers/ContentController', function() {
//
//   after(function (done) {
//     sails.models.content.drop(function () {
//       done();
//     });
//   });
//
//   describe('.create()', function() {
//     it('should call "req.ok" when recieves all required values ', function (done) {
//       var request  = httpMocks.createRequest({
//           method: 'POST',
//           body: {
//             title: 'Page',
//             content: 'Waiting for Lorem ipsum?'
//           }
//       });
//       request.user = { id: 0 };
//       request.meta = {type: 'page'};
//       var response = httpMocks.createResponse();
//       var okSpy = sinon.spy();
//       var errorSpy = sinon.spy();
//       response.ok = okSpy;
//       response.negotiate = errorSpy;
//
//       sails.controllers.content.create(request, response)
//       .then(function () {
//         expect(okSpy).to.be.called;
//         expect(errorSpy).to.not.be.called;
//         expect(okSpy.args[0][0]).to.be.an('object').with.property('message');
//         done();
//       });
//     });
//
//     it('should call "req.negotiate" when user id is not sent', function (done) {
//       var request  = httpMocks.createRequest({
//           method: 'POST',
//           body: {
//             title: 'Page',
//             content: 'Waiting for Lorem ipsum?'
//           }
//       });
//       request.meta = {type: 'page'};
//       var response = httpMocks.createResponse();
//       var okSpy = sinon.spy();
//       var errorSpy = sinon.spy();
//       response.ok = okSpy;
//       response.negotiate = errorSpy;
//
//       sails.controllers.content.create(request, response)
//       .then(function () {
//         expect(okSpy).to.not.be.called;
//         expect(errorSpy).to.be.called;
//         expect(errorSpy.args[0][0]).to.be.an('object').and.be.instanceof(Error);
//         done();
//       });
//     });
//
//     it('should call "req.negotiate" when conten type slug is not sent', function (done) {
//       var request  = httpMocks.createRequest({
//           method: 'POST',
//           body: {
//             title: 'Page',
//             content: 'Waiting for Lorem ipsum?'
//           }
//       });
//       request.meta = {type: 'page'};
//       var response = httpMocks.createResponse();
//       var okSpy = sinon.spy();
//       var errorSpy = sinon.spy();
//       response.ok = okSpy;
//       response.negotiate = errorSpy;
//
//       sails.controllers.content.create(request, response)
//       .then(function () {
//         expect(okSpy).to.not.be.called;
//         expect(errorSpy).to.be.called;
//         expect(errorSpy.args[0][0]).to.be.an('object').and.be.instanceof(Error);
//         done();
//       });
//     });
//   });
//
//   describe('.find()', function() {
//     before(function (done) {
//       sails.models.content.create({
//         title: 'Page 1',
//         type: 'page',
//         content: 'nope',
//         owner: 0
//       }).then(function () {
//         return sails.models.content.create({
//           title: 'Page 2',
//           type: 'page',
//           content: 'nope',
//           owner: 0
//         });
//       })
//       .catch(function (reason) {
//         console.log(reason);
//       })
//       .finally(done);
//     });
//
//     after(function (done) {
//       sails.models.content.drop(function () {
//         done();
//       });
//     });
//
//     it('should call "req.ok" with an array of menu items', function (done) {
//       var request  = httpMocks.createRequest({ method: 'GET'});
//       request.meta = {type: 'page'};
//       var response = httpMocks.createResponse();
//       var okSpy = sinon.spy();
//       var errorSpy = sinon.spy();
//       response.ok = okSpy;
//       response.negotiate = errorSpy;
//
//       sails.controllers.content.create(request, response)
//       .then(function () {
//         expect(okSpy).to.be.called;
//         expect(errorSpy).to.not.be.called;
//         console.log(okSpy.args);
//         expect(okSpy.args[0]).to.be.an('array');
//         done();
//       });
//     });
//   });
//
//
// });
