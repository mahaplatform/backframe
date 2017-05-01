'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

  it('returns an object of functions', function () {

    var backframe = (0, _index2.default)({
      bookshelf: {},
      knex: {},
      redis: {}
    });

    (0, _chai.expect)(backframe).to.be.an('object');
    (0, _chai.expect)(backframe.handler).to.be.a('function');
    (0, _chai.expect)(backframe.resources).to.be.a('function');
    (0, _chai.expect)(backframe.route).to.be.a('function');
    (0, _chai.expect)(backframe.router).to.be.a('function');
    (0, _chai.expect)(backframe.segment).to.be.a('function');
    (0, _chai.expect)(backframe.table).to.be.a('function');
  });

  it('accepts valid options', function () {

    var backframe = (0, _index2.default)({
      bookshelf: {},
      knex: {},
      redis: {}
    });
  });

  it('rejects invalid options', function (done) {

    try {
      (0, _index2.default)({ foo: 1 });
    } catch (e) {
      done();
    }
  });
};