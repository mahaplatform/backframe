'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.daterange = exports.filter = exports.extractSort = exports.buildListRoute = exports.normalizeOptions = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _core = require('../../utils/core');

var _options = require('../../utils/options');

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = (0, _core.mergeTypes)({
      filterParams: { type: ['string', 'string[]'], required: false },
      sortParams: { type: ['string', 'string[]'], required: false },
      searchParams: { type: ['string', 'string[]'], required: false },
      virtualFilters: { type: ['string', 'string[]'], required: false }
    }, backframeOptions.plugins);

    (0, _options.validateOptions)('list route', userOptions, TYPES);

    var options = normalizeOptions(userOptions, backframeOptions, TYPES);

    return buildListRoute(options, (0, _route2.default)(backframeOptions));
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, backframeOptions, types) {

  return (0, _extends3.default)({
    defaultFormat: backframeOptions.defaultFormat,
    defaultLimit: backframeOptions.defaultLimit,
    filterParams: [],
    knex: backframeOptions.knex,
    sortParams: [],
    searchParams: [],
    virtualFilters: []
  }, userOptions);
};

// convert options into route fomat { method, path, options, handler]}
var buildListRoute = exports.buildListRoute = function buildListRoute(routeOptions, buildRoute) {

  var beforeProcessor = function beforeProcessor(req, trx, options) {

    if (req.query.$filter) {

      var allowed = [].concat((0, _toConsumableArray3.default)(routeOptions.filterParams), (0, _toConsumableArray3.default)(routeOptions.virtualFilters), ['q']);

      (0, _options.checkPermitted)(req.query.$filter, allowed, 'Unable to filter on the keys {unpermitted}. Please add it to filterParams');

      if (req.query.$filter.q && !routeOptions.searchParams && process.env.NODE_ENV == 'development') {
        throw new BackframeError({ code: 412, message: 'Unable to search on q without searchParams' });
      }
    }

    if (req.query.$sort) {

      var sort = req.query.$sort.split(',').map(function (sort) {
        return sort.replace('-', '');
      });

      (0, _options.checkPermitted)(sort, routeOptions.sortParams, 'Unable to sort on the keys {unpermitted}. Please add it to sortParams');
    }
  };

  var processor = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, trx, options) {
      var tableName, columns, fetchOptions, limit, skip, query, allQueryObject, all, countQueryObject, count, paged;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tableName = routeOptions.model.extend().__super__.tableName;
              _context.next = 3;
              return options.knex(tableName).columnInfo();

            case 3:
              columns = _context.sent;


              req.query.$filter = _lodash2.default.pick(req.query.$filter, [].concat((0, _toConsumableArray3.default)(routeOptions.filterParams), ['q']));

              fetchOptions = routeOptions.withRelated ? { withRelated: (0, _core.coerceArray)(routeOptions.withRelated), transacting: trx } : { transacting: trx };
              limit = parseInt(_lodash2.default.get(req.query, '$page.limit') || routeOptions.defaultLimit);
              skip = parseInt(_lodash2.default.get(req.query, '$page.skip') || 0);

              query = function query(qb) {

                (0, _utils.defaultQuery)(req, trx, qb, routeOptions);

                if (routeOptions.searchParams && req.query.$filter && req.query.$filter.q) {

                  var vector = routeOptions.searchParams.map(function (param) {

                    return 'coalesce(' + (0, _core.castColumn)(tableName, param) + ', \'\')';
                  });

                  if (vector.length > 0) {

                    var term = req.query.$filter.q.toLowerCase().replace(' ', '%');

                    qb.whereRaw('lower(' + vector.join(' || ') + ') LIKE \'%' + term + '%\'');
                  }
                }

                if (req.query.$filter) filter(options, qb, req.query.$filter);

                if (req.query.$exclude_ids) qb.whereNotIn(tableName + '.id', req.query.$exclude_ids);

                if (req.query.$ids) qb.whereIn(tableName + '.id', req.query.$ids);

                return qb;
              };

              allQueryObject = null;


              routeOptions.model.query(function (qb) {

                (0, _utils.defaultQuery)(req, trx, qb, routeOptions);

                if (routeOptions.softDelete) qb.whereNull('deleted_at');

                allQueryObject = qb.toSQL();
              });

              all = function all() {
                return options.knex.raw('select count(*) as count from (' + allQueryObject.sql + ') as temp', allQueryObject.bindings).transacting(trx);
              };

              countQueryObject = query(routeOptions.knex(tableName)).toSQL();

              count = function count() {
                return routeOptions.knex.raw('select count(*) as count from (' + countQueryObject.sql + ') as temp', countQueryObject.bindings).transacting(trx);
              };

              paged = function paged() {
                return routeOptions.model.query(function (qb) {

                  var sort = extractSort(req.query.$sort, routeOptions.defaultSort, routeOptions.sortParams);

                  query(qb);

                  if (limit > 0) qb.limit(limit).offset(skip);

                  if (sort) sort.map(function (item) {

                    var cast = (0, _core.castColumn)(tableName, item.key);

                    var isString = columns[item.key] && columns[item.key].type === 'character varying';

                    var column = isString ? 'lower(' + cast + ')' : cast;

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

    return function processor(_x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();

  return buildRoute({
    method: routeOptions.method,
    path: routeOptions.path,
    beforeProcessor: beforeProcessor,
    processor: processor
  });
};

// takes sort param and converts to sort array
var extractSort = exports.extractSort = function extractSort(query, defaults) {
  var allowedParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


  if (query) {
    query = (0, _core.coerceArray)(query).filter(function (item) {
      return _lodash2.default.includes(allowedParams, item.replace('-', ''));
    });
  }

  var sort = query || defaults || null;

  if (!sort) return null;

  return (0, _core.coerceArray)(sort).map(function (item) {
    return {
      key: item.replace('-', ''),
      order: item[0] === '-' ? 'desc' : 'asc'
    };
  });
};

// map query filters to a qb object
var filter = exports.filter = function filter(options, qb, filters) {

  (0, _keys2.default)(filters).filter(function (key) {
    return filters[key];
  }).map(function (key) {

    if (filters[key].$eq) {

      if (filters[key].$eq === 'null') {

        qb.whereNull(key);
      } else if (filters[key].$eq === 'not_null') {

        qb.whereNotNull(key);
      } else {

        qb.whereRaw('lower(' + key + ') = ?', filters[key].$eq.toLowerCase());
      }
    } else if (filters[key].$ne) {

      qb.whereNot(key, filters[key].$ne);
    } else if (filters[key].$lk) {

      qb.whereRaw('lower(' + key + ') like ?', '%' + filters[key].$lk.toLowerCase() + '%');
    } else if (filters[key].$in) {

      var inArray = _lodash2.default.without(filters[key].$in, 'null');
      if (_lodash2.default.includes(filters[key].$in, 'null')) {
        qb.where(function () {
          this.whereIn(key, inArray).orWhereNull(key);
        });
      } else {
        qb.whereIn(key, inArray);
      }
    } else if (filters[key].$nin) {

      var _inArray = _lodash2.default.without(filters[key].$nin, 'null');
      if (_lodash2.default.includes(filters[key].$nin, 'null')) {
        qb.where(function () {
          this.whereNotIn(key, _inArray).orWhereNotNull(key);
        });
      } else {
        qb.whereNotIn(key, _inArray);
      }
    } else if (filters[key].$lt) {

      qb.where(key, '<', filters[key].$lt);
    } else if (filters[key].$lte) {

      qb.where(key, '<=', filters[key].$lte);
    } else if (filters[key].$gt) {

      qb.where(key, '>', filters[key].$gt);
    } else if (filters[key].$gte) {

      qb.where(key, '>=', filters[key].$gte);
    } else if (filters[key].$dr) {

      if (filters[key].$dr === 'this_week') {

        daterange(qb, key, 0, 'week');
      } else if (filters[key].$dr === 'last_week') {

        daterange(qb, key, -1, 'week');
      } else if (filters[key].$dr === 'next_week') {

        daterange(qb, key, 1, 'week');
      } else if (filters[key].$dr === 'this_month') {

        daterange(qb, key, 0, 'month');
      } else if (filters[key].$dr === 'last_month') {

        daterange(qb, key, -1, 'month');
      } else if (filters[key].$dr === 'next_month') {

        daterange(qb, key, 1, 'month');
      } else if (filters[key].$dr === 'this_quarter') {

        daterange(qb, key, 0, 'quarter');
      } else if (filters[key].$dr === 'last_quarter') {

        daterange(qb, key, -1, 'quarter');
      } else if (filters[key].$dr === 'next_quarter') {

        daterange(qb, key, 1, 'quarter');
      } else if (filters[key].$dr === 'this_year') {

        daterange(qb, key, 0, 'year');
      } else if (filters[key].$dr === 'last_year') {

        daterange(qb, key, -1, 'year');
      } else if (filters[key].$dr === 'next_year') {

        daterange(qb, key, 1, 'year');
      }
    }
  });
};

var daterange = exports.daterange = function daterange(qb, field, quantity, unit) {

  qb.where(field, '>=', (0, _moment2.default)().add(quantity, unit).startOf(unit).format('YYYY-MM-DD'));

  qb.where(field, '<=', (0, _moment2.default)().add(quantity, unit).endOf(unit).format('YYYY-MM-DD'));
};