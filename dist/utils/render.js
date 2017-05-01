'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {

  return function (req, trx, result) {

    var useSerializer = !_lodash2.default.isPlainObject(result) && !_lodash2.default.isNil(options.serializer);

    var serialize = function serialize() {
      return useSerializer ? options.serializer(req, trx, result) : result.toJSON();
    };

    if (options.cacheFor) {

      if (!options.redis && process.env.NODE_ENV == 'development') {
        throw new _error2.default({ code: 412, message: 'you must include a redis configuration' });
      }

      var key = options.name + '-' + result.get('id') + '-' + Math.floor(result.get('updated_at').getTime() / 1000);

      return (0, _cache2.default)(options)(key, options.cacheFor, serialize);
    }

    return serialize();
  };
};