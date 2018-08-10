'use strict';

var _chai = require('chai');

var _backframe = require('../objects/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('backframe', function () {

  it('should be instantiated by an object', function () {

    var backframe = new _backframe2.default({
      defaultFormat: 'json',
      defaultLimit: 50,
      knex: 'foo',
      logger: 'bar',
      path: '/foobar',
      plugins: ['a', 'b'],
      segments: ['a', 'b']
    });

    (0, _chai.expect)(backframe.defaultFormat).to.be('json');
    (0, _chai.expect)(backframe.defaultLimit).to.be(50);
    (0, _chai.expect)(backframe.knex).to.be('foo');
    (0, _chai.expect)(backframe.logger).to.be('bar');
    (0, _chai.expect)(backframe.path).to.be('/foobar');
    (0, _chai.expect)(backframe.plugins).to.be(['a', 'b']);
    (0, _chai.expect)(backframe.segments).to.be(['a', 'b']);
  });
});