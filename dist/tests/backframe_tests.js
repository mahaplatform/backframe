'use strict';

var _chai = require('chai');

var _backframe = require('../objects/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('backframe', function () {

  var defaultFormat = 'json';
  var defaultLimit = 50;
  var knex = 'foo';
  var logger = 'bar';
  var path = '/foobar';
  var plugins = ['a', 'b'];
  var segments = ['a', 'b'];

  it('should be instantiated by an object', function () {

    var backframe = new _backframe2.default({
      defaultFormat: defaultFormat,
      defaultLimit: defaultLimit,
      knex: knex,
      logger: logger,
      path: path,
      plugins: plugins,
      segments: segments
    });

    (0, _chai.expect)(backframe.defaultFormat).to.be.eql(defaultFormat);
    (0, _chai.expect)(backframe.defaultLimit).to.be.eql(defaultLimit);
    (0, _chai.expect)(backframe.knex).to.be.eql(knex);
    (0, _chai.expect)(backframe.logger).to.be.eql(logger);
    (0, _chai.expect)(backframe.path).to.be.eql(path);
    (0, _chai.expect)(backframe.plugins).to.be.eql(plugins);
    (0, _chai.expect)(backframe.segments).to.be.eql(segments);
  });

  it('should set defaultFormat', function () {

    var backframe = new _backframe2.default();

    backframe.setDefaultFormat(defaultFormat);

    (0, _chai.expect)(backframe.defaultFormat).to.be.eql(defaultFormat);
  });

  it('should set defaultLimit', function () {

    var backframe = new _backframe2.default();

    backframe.setDefaultLimit(defaultLimit);

    (0, _chai.expect)(backframe.defaultLimit).to.be.eql(defaultLimit);
  });

  it('should set knex', function () {

    var backframe = new _backframe2.default();

    backframe.setKnex(knex);

    (0, _chai.expect)(backframe.knex).to.be.eql(knex);
  });

  it('should set logger', function () {

    var backframe = new _backframe2.default();

    backframe.setLogger(logger);

    (0, _chai.expect)(backframe.logger).to.be.eql(logger);
  });

  it('should set path', function () {

    var backframe = new _backframe2.default();

    backframe.setPath(path);

    (0, _chai.expect)(backframe.path).to.be.eql(path);
  });

  it('should set plugins', function () {

    var backframe = new _backframe2.default();

    backframe.setPlugins(plugins);

    (0, _chai.expect)(backframe.plugins).to.be.eql(plugins);
  });

  it('should append plugins', function () {

    var a = 1;
    var b = 2;

    var backframe = new _backframe2.default({
      plugins: [a]
    });

    backframe.appendPlugin(b);

    (0, _chai.expect)(backframe.plugins.length).to.be.eql(2);
    (0, _chai.expect)(backframe.plugins[0]).to.be.eql(a);
    (0, _chai.expect)(backframe.plugins[1]).to.be.eql(b);
  });

  it('should append plugins', function () {

    var a = 1;
    var b = 2;

    var backframe = new _backframe2.default({
      plugins: [b]
    });

    backframe.prependPlugin(a);

    (0, _chai.expect)(backframe.plugins.length).to.be.eql(2);
    (0, _chai.expect)(backframe.plugins[0]).to.be.eql(a);
    (0, _chai.expect)(backframe.plugins[1]).to.be.eql(b);
  });

  it('should set segments', function () {

    var backframe = new _backframe2.default();

    backframe.setSegments(segments);

    (0, _chai.expect)(backframe.segments).to.be.eql(segments);
  });

  it('should append segments', function () {

    var a = 1;
    var b = 2;

    var backframe = new _backframe2.default({
      segments: [a]
    });

    backframe.appendSegment(b);

    (0, _chai.expect)(backframe.segments.length).to.be.eql(2);
    (0, _chai.expect)(backframe.segments[0]).to.be.eql(a);
    (0, _chai.expect)(backframe.segments[1]).to.be.eql(b);
  });

  it('should append segments', function () {

    var a = 1;
    var b = 2;

    var backframe = new _backframe2.default({
      segments: [b]
    });

    backframe.prependSegment(a);

    (0, _chai.expect)(backframe.segments.length).to.be.eql(2);
    (0, _chai.expect)(backframe.segments[0]).to.be.eql(a);
    (0, _chai.expect)(backframe.segments[1]).to.be.eql(b);
  });
});