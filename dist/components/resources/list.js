'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../../utils');

var _core = require('../../utils/core');

var _list_route = require('../list_route');

var _options = require('../../utils/options');

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var beforeProcessor = function beforeProcessor(req, trx, options) {

    if (req.query.$filter) {

      var allowed = [].concat((0, _toConsumableArray3.default)(options.filterParams), (0, _toConsumableArray3.default)(options.virtualFilters), ['q']);

      (0, _options.checkPermitted)(req.query.$filter, allowed, 'Unable to filter on the keys {unpermitted}. Please add it to filterParams');

      if (req.query.$filter.q && !options.searchParams && process.env.NODE_ENV == 'development') {
        throw new _error2.default({ code: 412, message: 'Unable to search on q without searchParams' });
      }
    }

    if (req.query.$sort) {

      var sort = req.query.$sort.split(',').map(function (sort) {
        return sort.replace('-', '');
      });

      (0, _options.checkPermitted)(sort, options.sortParams, 'Unable to sort on the keys {unpermitted}. Please add it to sortParams');
    }
  };

  var processor = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, trx, options) {
      var tableName, columns, fetchOptions, limit, skip, query, allQueryObject, all, countQueryObject, count, paged;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tableName = options.model.extend().__super__.tableName;
              _context.next = 3;
              return options.knex(tableName).columnInfo();

            case 3:
              columns = _context.sent;


              req.query.$filter = _lodash2.default.pick(req.query.$filter, [].concat((0, _toConsumableArray3.default)(options.filterParams), ['q']));

              fetchOptions = options.withRelated ? { withRelated: (0, _core.coerceArray)(options.withRelated), transacting: trx } : { transacting: trx };
              limit = parseInt(_lodash2.default.get(req.query, '$page.limit') || options.defaultLimit);
              skip = parseInt(_lodash2.default.get(req.query, '$page.skip') || 0);

              query = function query(qb) {

                (0, _utils.defaultQuery)(req, trx, qb, options);

                if (options.searchParams && req.query.$filter && req.query.$filter.q) {

                  var vector = options.searchParams.map(function (param) {

                    return 'coalesce(' + (0, _core.castColumn)(tableName, param) + ', \'\')';
                  }).join(' || ');

                  var term = req.query.$filter.q.toLowerCase().replace(' ', '%');

                  qb.whereRaw(vector + ' LIKE \'%' + term + '%\'');
                }

                if (req.query.$filter) (0, _list_route.filter)(options, qb, req.query.$filter);

                if (req.query.$exclude_ids) qb.whereNotIn(tableName + '.id', req.query.$exclude_ids);

                if (req.query.$ids) qb.whereIn(tableName + '.id', req.query.$ids);

                return qb;
              };

              allQueryObject = null;


              options.model.query(function (qb) {

                (0, _utils.defaultQuery)(req, trx, qb, options);

                if (options.softDelete) qb.whereNull('deleted_at');

                allQueryObject = qb.toSQL();
              });

              all = function all() {
                return options.knex.raw('select count(*) as count from (' + allQueryObject.sql + ') as temp', allQueryObject.bindings).transacting(trx);
              };

              countQueryObject = query(options.knex(tableName)).toSQL();

              count = function count() {
                return options.knex.raw('select count(*) as count from (' + countQueryObject.sql + ') as temp', countQueryObject.bindings).transacting(trx);
              };

              paged = function paged() {
                return options.model.query(function (qb) {

                  var sort = (0, _list_route.extractSort)(req.query.$sort, options.defaultSort, options.sortParams);

                  query(qb);

                  if (limit > 0) qb.limit(limit).offset(skip);

                  if (sort) sort.map(function (item) {

                    var column = (0, _core.castColumn)(tableName, item.key);

                    var isString = columns[item.key] && columns[item.key].type === 'character varying';

                    qb.orderByRaw(column + ' ' + item.order);
                  });
                }).fetchAll(fetchOptions).then(function (records) {
                  return records.map(function (record) {
                    return record;
                  });
                });
              };

              return _context.abrupt('return', (0, _bluebird.all)([all(), count(), paged()]).then(function (responses) {

                var allResonse = responses[0].rows ? responses[0].rows[0] : responses[0][0];

                var all = allResonse.count ? parseInt(allResonse.count) : 0;

                var totalResonse = responses[1].rows ? responses[1].rows[0] : responses[1][0];

                var total = totalResonse.count ? parseInt(totalResonse.count) : 0;

                var records = responses[2];

                return { all: all, total: total, records: records, limit: limit, skip: skip };
              }));

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function processor(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  return buildRoute({
    action: 'list',
    method: 'get',
    path: '',
    beforeProcessor: beforeProcessor,
    processor: processor,
    renderer: _utils.defaultRenderer,
    responder: (0, _utils.defaultResponder)('Successfully found records')
  });
};