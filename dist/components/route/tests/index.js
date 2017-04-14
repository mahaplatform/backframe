'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

  it('requires a method and path', function (done) {

    try {
      (0, _index2.default)()();
    } catch (e) {
      done();
    }
  });

  it('succeeds with only a method, path, and handler', function () {

    var route = (0, _index2.default)()({
      method: 'get',
      path: '/foo',
      handler: function handler(req, res) {}
    });
  });
};