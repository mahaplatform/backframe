'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var buildSegment = require('../index').default();

exports.default = function () {

  it('succeeds', function () {

    var routes = buildSegment({
      authenticated: true,
      prefix: '/foo',
      routes: [{
        method: 'get',
        path: 'bar',
        handler: function handler(req, res) {
          return 'result';
        }
      }, {
        method: 'get',
        path: 'bar',
        handler: function handler(req, res) {
          return 'result';
        }
      }]
    });
  });

  it('merges events from backframe and route', function () {

    var backframeOptions = {
      plugins: [{
        alterRequest: 1,
        before: 1,
        after: 1,
        alterRecord: 1
      }]
    };

    var routeOptions = {
      alterRequest: [2, 3],
      before: [2, 3],
      processor: 'foo',
      after: [2, 3],
      alterRecord: [2, 3],
      responder: 'bar',
      method: 'get',
      path: '/foo'
    };

    var expected = {
      method: 'get',
      path: '/foo',
      handler: {
        alterRequest: [1, 2, 3],
        before: [1, 2, 3],
        processor: 'foo',
        after: [1, 2, 3],
        alterRecord: [1, 2, 3],
        responder: 'bar'
      }
    };

    var route = buildRoute(backframeOptions)(routeOptions);

    (0, _chai.expect)(route).is.eql(expected);
  });
};