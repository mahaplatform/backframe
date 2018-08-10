'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _filter_sort = require('./filter_sort');

var _filter_sort2 = _interopRequireDefault(_filter_sort);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListRoute = function (_Route) {
  (0, _inherits3.default)(ListRoute, _Route);

  function ListRoute() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ListRoute);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ListRoute.__proto__ || Object.getPrototypeOf(ListRoute)).call(this, config));

    _this.defaultQuery = null;
    _this.defaultSort = null;
    _this.filterParams = null;
    _this.model = null;
    _this.serializer = null;
    _this.searchParams = null;
    _this.sortParams = null;
    _this.withRelated = null;

    if (config.defaultQuery) _this.setDefaultQuery(config.defaultQuery);
    if (config.defaultSort) _this.setDefaultSort(config.defaultSort);
    if (config.filterParams) _this.setFilterParams(config.filterParams);
    if (config.model) _this.setModel(config.model);
    if (config.serializer) _this.setSerializer(config.serializer);
    if (config.searchParams) _this.setSearchParams(config.searchParams);
    if (config.sortParams) _this.setSortParams(config.sortParams);
    if (config.withRelated) _this.setWithRelated(config.withRelated);
    _this.setMethod('get');
    _this.setPath('');
    _this.setProcessor(_this._processor);
    return _this;
  }

  (0, _createClass3.default)(ListRoute, [{
    key: 'setDefaultQuery',
    value: function setDefaultQuery(defaultQuery) {
      this._setRouteParams('defaultQuery', defaultQuery);
    }
  }, {
    key: 'setDefaultSort',
    value: function setDefaultSort(defaultSort) {
      this._setRouteParams('defaultSort', defaultSort);
    }
  }, {
    key: 'setModel',
    value: function setModel(model) {
      this._setRouteParams('model', model);
    }
  }, {
    key: 'setFilterParams',
    value: function setFilterParams(filterParams) {
      this._setRouteParams('filterParams', filterParams);
    }
  }, {
    key: 'setSerializer',
    value: function setSerializer(serializer) {
      this._setRouteParams('serializer', serializer);
    }
  }, {
    key: 'setSearchParams',
    value: function setSearchParams(searchParams) {
      this._setRouteParams('searchParams', searchParams);
    }
  }, {
    key: 'setSortParams',
    value: function setSortParams(sortParams) {
      this._setRouteParams('sortParams', sortParams);
    }
  }, {
    key: 'setWithRelated',
    value: function setWithRelated(withRelated) {
      this.routeOptions.withRelated = this.withRelated = withRelated;
    }
  }, {
    key: '_processor',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
        var _this2 = this;

        var tableName, filterSort, limit, skip, all, count, paged, responses;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                tableName = options.model.extend().__super__.tableName;
                filterSort = new _filter_sort2.default(options);
                limit = parseInt(_lodash2.default.get(req.query, '$page.limit') || options.defaultLimit);
                skip = parseInt(_lodash2.default.get(req.query, '$page.skip') || 0);

                all = function all() {
                  return _this2._countRecords(req, trx, filterSort, 'applyShared', options);
                };

                count = function count() {
                  return _this2._countRecords(req, trx, filterSort, 'apply', options);
                };

                paged = function paged() {
                  return options.model.query(function (qb) {

                    filterSort.apply(req, trx, qb, options);

                    if (limit > 0) qb.limit(limit).offset(skip);
                  }).fetchAll({
                    transacting: trx,
                    withRelated: options.withRelated ? _lodash2.default.castArray(options.withRelated) : []
                  });
                };

                _context.next = 9;
                return (0, _bluebird.all)([all(), count(), paged()]);

              case 9:
                responses = _context.sent;
                return _context.abrupt('return', {
                  all: parseInt(responses[0].rows[0].count),
                  total: parseInt(responses[1].rows[0].count),
                  records: responses[2].toArray(),
                  limit: limit,
                  skip: skip
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _processor(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return _processor;
    }()
  }, {
    key: '_mergeOptions',
    value: function _mergeOptions(options) {
      return (0, _extends3.default)({}, options, _lodash2.default.pick(this, ['defaultQuery', 'defaultSort', 'filterParams', 'model', 'serializer', 'searchParams', 'sortParams', 'withRelated']));
    }
  }, {
    key: '_countRecords',
    value: function _countRecords(req, trx, filter, fn, options) {

      var tableName = options.model.extend().__super__.tableName;

      var query = filter[fn](req, trx, options.knex(tableName), options).toSQL();

      return options.knex.raw('select count(*) as count from (' + query.sql + ') as temp', query.bindings).transacting(trx);
    }
  }]);
  return ListRoute;
}(_route2.default);

exports.default = ListRoute;