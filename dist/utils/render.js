'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return function (req, trx, result) {

    var useSerializer = !_lodash2.default.isPlainObject(result) && !_lodash2.default.isNil(options.serializer);

    var serialize = function serialize() {
      return useSerializer ? options.serializer(req, trx, result) : result.toJSON();
    };

    return serialize();
  };
};