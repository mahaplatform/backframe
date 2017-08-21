'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOptions = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _options = require('../../utils/options');

var _handler = require('../handler');

var _handler2 = _interopRequireDefault(_handler);

var _list_route = require('../list_route');

var _list_route2 = _interopRequireDefault(_list_route);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

var _resources = require('../resources');

var _resources2 = _interopRequireDefault(_resources);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _segment = require('../segment');

var _segment2 = _interopRequireDefault(_segment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var TYPES = {
    defaultLimit: { type: 'integer', required: false, default: 100 },
    defaultFormat: { type: 'string', required: false, default: 'json' },
    knex: { type: 'object', required: true },
    plugins: { type: 'object[]', required: false, default: [] }
  };

  (0, _options.validateOptions)('backframe', userOptions, TYPES);

  var options = normalizeOptions(userOptions, TYPES);

  return {
    listRoute: (0, _list_route2.default)(options),
    route: (0, _route2.default)(options),
    resources: (0, _resources2.default)(options),
    router: (0, _router2.default)(options),
    segment: (0, _segment2.default)(options)
  };
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends3.default)({}, (0, _options.defaultOptions)(types), userOptions);
};