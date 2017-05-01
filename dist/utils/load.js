'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _error = require('../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {

  var tableName = options.model.extend().__super__.tableName;

  return function (req, trx) {

    var fetchOptions = options.withRelated ? { withRelated: (0, _utils.coerceArray)(options.withRelated), transacting: trx } : { transacting: trx };

    return options.model.query(function (qb) {

      qb = (0, _utils.defaultQuery)(req, options, qb, {});

      qb.where(tableName + '.id', req.params.id);
    }).fetch(fetchOptions).then(function (record) {

      if (!record) {
        throw new _error2.default({ code: 404, message: 'Unable to find ' + options.name });
      }

      return record;
    });
  };
};