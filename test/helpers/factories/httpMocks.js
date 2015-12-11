var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var _ = require('lodash');

module.exports = {
  createRequest: function (options) {
    var extra = options ? options.extra : {};
    var request = httpMocks.createRequest(options);

    _.defaults(request, extra);

    return request;
  },
  createResponse: function (options) {
    var spies = options.spies;
    var response = httpMocks.createResponse(options);

    _.forIn(spies, function (value, key) {
      response[key] = sinon.spy();
    });

    return response;
  }
};
