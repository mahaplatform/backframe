'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

exports.default = function (options) {

  var fetchOptions = options.withRelated ? { withRelated: (0, _utils.coerceArray)(options.withRelated) } : {};

  var tableName = options.model.extend().__super__.tableName;

  return function (req) {

    return options.model.query(function (qb) {

      qb = (0, _utils.defaultQuery)(req, options, qb, {});

      qb.where(tableName + '.id', req.params.id);
    }).fetch(fetchOptions).then(function (record) {

      if (!record) {
        throw { code: 404, message: 'Unable to find ' + options.name };
      }

      return record;
    });
  };
};