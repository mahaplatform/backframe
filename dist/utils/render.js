'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {

  return function (req, result, resolve, reject) {

    var serialize = function serialize() {

      if (!options.serializer) {
        return _bluebird2.default.resolve(result);
      }

      return new _bluebird2.default(function (resolve, reject) {
        return _lodash2.default.isPlainObject(result) ? resolve(result.toJSON()) : options.serializer(req, result, resolve, reject);
      });
    };

    if (options.cacheFor) {

      if (!options.redis && process.env.NODE_ENV == 'development') {
        return reject({ code: 412, message: 'you must include a redis configuration' });
      }

      var key = options.name + '-' + result.get('id') + '-' + Math.floor(result.get('updated_at').getTime() / 1000);

      return (0, _cache2.default)(options)(key, options.cacheFor, serialize).then(resolve);
    }

    return serialize().then(resolve);
  };
};