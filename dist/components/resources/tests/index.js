'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _user_mock = require('../../../user_mock');

var _user_mock2 = _interopRequireDefault(_user_mock);

var _constants = require('../../../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildResources = require('../index').default();

exports.default = function () {

  it('requires a name and model', function (done) {

    try {
      buildResources();
    } catch (e) {
      done();
    }
  });

  it('succeeds with required options', function () {

    var routes = buildResources({
      name: 'user',
      model: (0, _user_mock2.default)([])
    });

    (0, _chai.expect)(routes).to.be.an('array');
    (0, _chai.expect)(routes.length).to.eql(6);
    (0, _chai.expect)(routes[0]).to.be.an('object');
    (0, _chai.expect)(routes[1]).to.be.an('object');
    (0, _chai.expect)(routes[2]).to.be.an('object');
    (0, _chai.expect)(routes[3]).to.be.an('object');
    (0, _chai.expect)(routes[4]).to.be.an('object');
    (0, _chai.expect)(routes[5]).to.be.an('object');
  });

  it('sets a default path', function () {

    var routes = buildResources({
      name: 'user',
      model: (0, _user_mock2.default)([])
    });

    (0, _chai.expect)(routes[0].options.path).to.equal('users');
  });

  it('set a override path', function () {

    var routes = buildResources({
      name: 'user',
      model: (0, _user_mock2.default)([]),
      path: 'people'
    });

    (0, _chai.expect)(routes[0].options.path).to.equal('people');
  });

  describe('list route', function () {

    it('succeeds with basic options', function () {

      var routes = buildResources({
        name: 'user',
        model: (0, _user_mock2.default)([])
      });

      var list = routes[0];

      (0, _chai.expect)(list).to.include.keys(['method', 'path', 'handler', 'options']);
      (0, _chai.expect)(list.method).to.equal('get');
      (0, _chai.expect)(list.path).to.equal('/users');
      (0, _chai.expect)(list.handler).to.include.keys(constants.BACKFRAME_LIFECYCLE);
      (0, _chai.expect)(list.handler.alterRequest).to.be.empty;
      (0, _chai.expect)(list.handler.beforeProcessor.length).to.equal(1);
      (0, _chai.expect)(list.handler.afterProcessor).to.be.empty;
      (0, _chai.expect)(list.handler.alterRecord).to.be.empty;
      (0, _chai.expect)(list.handler.processor).to.be.a('function');
      (0, _chai.expect)(list.handler.renderer).to.be.a('function');
      (0, _chai.expect)(list.handler.responder).to.be.a('function');
      (0, _chai.expect)(list.handler.afterCommit).to.be.empty;
      (0, _chai.expect)(list.handler.beforeRollback).to.be.empty;
    });
  });

  describe('show route', function () {
    it('succeeds', function () {});
  });

  describe('create route', function () {
    it('succeeds', function () {});
  });

  describe('edit route', function () {
    it('succeeds', function () {});
  });

  describe('update route', function () {
    it('succeeds', function () {});
  });

  describe('destroy route', function () {
    it('succeeds', function () {});
  });
};