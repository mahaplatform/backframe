'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var buildRouter = require('../index').default();

exports.default = function () {

  it('fails without route option', function (done) {

    try {
      buildRouter();
    } catch (e) {
      done();
    }
  });

  it('fails with invalid options', function (done) {

    try {
      buildRouter({ foo: 'bar' });
    } catch (e) {
      done();
    }
  });

  it('succeeds with valid options', function () {

    var router = buildRouter({
      routes: [{
        method: 'get',
        path: '/foo',
        handler: function handler(req, res) {}
      }]
    });
  });
};