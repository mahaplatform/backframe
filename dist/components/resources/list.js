'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../../utils');

var _core = require('../../utils/core');

var _list = require('../../utils/list');

var _options = require('../../utils/options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (buildRoute) {

  var beforeHooks = function beforeHooks(options) {
    return function (req, resolve, reject) {

      if (req.query.$filter) {

        (0, _options.checkPermitted)(req.query.$filter, [].concat(_toConsumableArray(options.filterParams), ['q']), reject, 'Unable to filter on the keys {unpermitted}. Please add it to filterParams');

        if (req.query.$filter.q && !options.searchParams && process.env.NODE_ENV == 'development') {
          return reject({ code: 412, message: 'Unable to search on q without searchParams' });
        }
      }

      if (req.query.$sort) {
        (0, _options.checkPermitted)(req.query.$sort, options.sortParams, reject, 'Unable to sort on the keys {unpermitted}. Please add it to sortParams');
      }

      resolve();
    };
  };

  var processor = function processor(options) {
    return function (req, resolve, reject) {

      var tableName = options.model.extend().__super__.tableName;

      req.query.$filter = _lodash2.default.pick(req.query.$filter, options.filterParams);

      var fetchOptions = options.withRelated ? { withRelated: (0, _core.coerceArray)(options.withRelated) } : {};

      var limit = parseInt(_lodash2.default.get(req.query, '$page.limit')) || 50;

      var skip = parseInt(_lodash2.default.get(req.query, '$page.skip')) || 0;

      var query = function query(qb) {

        qb = (0, _utils.defaultQuery)(req, options, qb, req.query.$filter);

        if (options.searchParams && req.query.$filter && req.query.$filter.q) {
          var term = '%' + req.query.$filter.q.toLowerCase() + '%';
          var sql = options.searchParams.map(function (param) {
            return 'LOWER(' + param + ') LIKE ?';
          }).join(' OR ');
          var vars = options.searchParams.map(function (param) {
            return term;
          });
          qb.whereRaw('(' + sql + ')', vars);
        }

        if (req.query.$filter) {
          (0, _list.filter)(qb, req.query.$filter);
        }

        if (req.query.$exclude_ids) {
          qb.whereNotIn(tableName + '.id', req.query.$exclude_ids);
        }

        if (req.query.$ids) {
          qb.whereIn(tableName + '.id', req.query.$ids);
        }

        return qb;
      };

      var all = function all() {
        return options.model.query(function (qb) {

          if (options.ownedByUser) {
            qb = qb.where('user_id', req.user.get('id'));
          }

          if (options.softDelete) {
            qb = qb.whereNull('deleted_at');
          }

          qb.count('* as count');
        }).fetchAll();
      };

      var queryObject = query(options.knex(tableName)).toSQL();

      var count = function count() {
        return options.knex.raw('select count(*) as count from (' + queryObject.sql + ') as temp', queryObject.bindings);
      };

      var paged = function paged() {
        return options.model.query(function (qb) {

          var sort = (0, _list.extractSort)(req.query.$sort, options.defaultSort, options.sortParams);

          qb = query(qb);

          if (req.query.$page) {

            qb.limit(limit).offset(skip);
          }

          if (sort) {
            sort.map(function (item) {
              qb.orderBy(item.key, item.order);
            });
          }
        }).fetchAll(fetchOptions).then(function (records) {
          return records.map(function (record) {
            return record;
          });
        });
      };

      return (0, _bluebird.all)([all(), count(), paged()]).then(function (responses) {

        var all = parseInt(responses[0].toJSON()[0].count);

        var totalResonse = responses[1].rows ? responses[1].rows[0] : responses[1][0];

        var total = totalResonse.count ? parseInt(totalResonse.count) : 0;

        var records = responses[2];

        resolve({ all: all, total: total, records: records, limit: limit, skip: skip });
      }).catch(function (err) {

        if (err.errors) return reject({ code: 422, message: 'Unable to create ' + options.name, errors: err.toJSON() });

        throw err;
      });
    };
  };

  return buildRoute({
    method: 'get',
    path: '',
    beforeHooks: beforeHooks,
    processor: processor,
    renderer: _utils.defaultRenderer,
    responder: (0, _utils.defaultResponder)('Successfully found records')
  });
};