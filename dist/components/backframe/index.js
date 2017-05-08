'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _environment = require('../../services/environment');

var _environment2 = _interopRequireDefault(_environment);

var _options = require('../../utils/options');

var _handler = require('../handler');

var _handler2 = _interopRequireDefault(_handler);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

var _resources = require('../resources');

var _resources2 = _interopRequireDefault(_resources);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _segment = require('../segment');

var _segment2 = _interopRequireDefault(_segment);

var _table = require('../table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var TYPES = {
    plugins: { type: 'object[]', required: false, default: [] }
  };

  (0, _options.validateOptions)('backframe', userOptions, TYPES);

  return {
    handler: (0, _handler2.default)(userOptions),
    route: (0, _route2.default)(userOptions),
    resources: (0, _resources2.default)(userOptions),
    router: (0, _router2.default)(userOptions),
    segment: (0, _segment2.default)(userOptions),
    table: (0, _table2.default)(userOptions)
  };
};