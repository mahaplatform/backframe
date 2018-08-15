'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterSort = function () {
  function FilterSort(options) {
    (0, _classCallCheck3.default)(this, FilterSort);
    this.defaultQuery = null;
    this.defaultSort = null;
    this.knex = null;
    this.model = null;
    this.filters = null;
    this.filterParams = null;
    this.searchParams = null;
    this.sortParams = [];

    this.defaultQuery = options.defaultQuery;
    this.defaultSort = options.defaultSort;
    this.knex = options.knex;
    this.model = options.model;
    this.filterParams = options.filterParams;
    this.searchParams = options.searchParams;
    this.sortParams = options.sortParams;
  }

  (0, _createClass3.default)(FilterSort, [{
    key: 'applyShared',
    value: function applyShared(req, trx, qb, options) {

      this._filterShared(req, trx, qb, options);

      return qb;
    }
  }, {
    key: 'apply',
    value: function apply(req, trx, qb, options) {

      var tableName = this.model.extend().__super__.tableName;

      var filters = this._getAllowedFilters(req.query.$filter, this.filterParams);

      var virtualFilters = this._getAllowedVirtualFilters(req.query.$filter, this.virtualFilters);

      var sort = this._getAllowedSort(req.query.$sort, this.sortParams, this.defaultSort);

      if (virtualFilters) this._filterVirtual(qb, virtualFilters);

      if (filters.q && this.searchParams) this._filterSearch(qb, tableName, this.searchParams, filters.q);

      if (req.query.$exclude_ids) this._filterExcludeIds(qb, tableName, req.query.$exclude_ids);

      if (req.query.$ids) this._filterIncludeIds(qb, tableName, req.query.$ids);

      this._filterShared(req, trx, qb, options);

      if (filters) this._filterRecords(qb, filters, tableName);

      if (sort) this._sortRecords(qb, sort, tableName);

      return qb;
    }
  }, {
    key: '_getAllowedFilters',
    value: function _getAllowedFilters(filters, filterParams) {

      if (!filterParams || !filters) return {};

      return _lodash2.default.pick(filters, [].concat((0, _toConsumableArray3.default)(filterParams), ['q']));
    }
  }, {
    key: '_getAllowedVirtualFilters',
    value: function _getAllowedVirtualFilters(filters, virtualFiters) {

      if (!filters || !virtualFiters) return null;

      return _lodash2.default.pick(filters, Object.keys(virtualFiters));
    }
  }, {
    key: '_getAllowedSort',
    value: function _getAllowedSort(sort, sortParams, defaultSort) {

      if (!sort) return defaultSort || null;

      return _lodash2.default.castArray(sort).filter(function (item) {

        return _lodash2.default.includes(sortParams, item.replace(/^-/, ''));
      });
    }
  }, {
    key: '_filterVirtual',
    value: function _filterVirtual(qb, virtualFilters) {

      Object.keys(virtualFilters).map(function (key) {

        if (!virtualFilters[key]) return;

        virtualFilters[key](qb, virtualFilters[key]);
      });
    }
  }, {
    key: '_filterSearch',
    value: function _filterSearch(qb, tableName, searchParams, q) {
      var _this = this;

      if (!q) return;

      var vector = searchParams.map(function (param) {

        return 'coalesce(' + _this._castColumn(tableName, param) + ', \'\')';
      }).join(' || ');

      var term = q.toLowerCase().replace(' ', '%');

      qb.whereRaw('lower(' + vector + ') LIKE \'%' + term + '%\'');
    }
  }, {
    key: '_filterExcludeIds',
    value: function _filterExcludeIds(qb, tableName, ids) {

      qb.whereNotIn(tableName + '.id', ids);
    }
  }, {
    key: '_filterIncludeIds',
    value: function _filterIncludeIds(qb, tableName, ids) {

      qb.whereIn(tableName + '.id', ids);
    }
  }, {
    key: '_filterShared',
    value: function _filterShared(req, trx, qb, options) {

      if (this.defaultQuery) this._filterDefault(this.defaultQuery, req, trx, qb, options);

      if (this.softDelete) this._filterSoftDelete(qb);
    }
  }, {
    key: '_filterDefault',
    value: function _filterDefault(defaultQuery, req, trx, qb, options) {

      _lodash2.default.castArray(defaultQuery).map(function (query) {

        query(req, trx, qb, options);
      });
    }
  }, {
    key: '_filterSoftDelete',
    value: function _filterSoftDelete(qb) {

      qb.whereNull('deleted_at');
    }
  }, {
    key: '_filterRecords',
    value: function _filterRecords(qb, filters, tableName) {
      var _this2 = this;

      Object.keys(filters).filter(function (key) {
        return filters[key];
      }).map(function (key) {

        var column = _this2._castColumn(tableName, key);

        _this2._filterColumn(qb, column, filters[key]);
      });
    }
  }, {
    key: '_filterColumn',
    value: function _filterColumn(qb, column, filter) {

      if (filter.$eq) {

        this._filterEqual(qb, column, filter.$eq);
      } else if (filter.$ne) {

        this._filterNotEqual(qb, column, filter.$ne);
      } else if (filter.$lk) {

        this._filterLike(qb, column, filter.$lk);
      } else if (filter.$in) {

        this._filterIn(qb, column, filter.$in);
      } else if (filter.$nin) {

        this._filterNotIn(qb, column, filter.$nin);
      } else if (filter.$lt) {

        this._filterLessThan(qb, column, filter.$lt);
      } else if (filter.$lte) {

        this._filterLessThanEqualTo(qb, column, filter.$lte);
      } else if (filter.$gt) {

        this._filterGreaterThan(qb, column, filter.$gt);
      } else if (filter.$gte) {

        this._filterGreaterThanEqualTo(qb, column, filter.$gte);
      } else if (filter.$dr) {

        this._filterDateRange(qb, column, filter.$dr);
      }
    }
  }, {
    key: '_filterEqual',
    value: function _filterEqual(qb, column, value) {

      if (value === 'null') return qb.whereNull(column);

      if (value === 'not_null') return qb.whereNotNull(column);

      if (value === 'true') return qb.where(column, true);

      if (value === 'false') return qb.where(column, false);

      if (value.match(/^\d*$/)) return qb.where(column, value);

      return qb.whereRaw('lower(' + column + ') = ?', value.toLowerCase());
    }
  }, {
    key: '_filterNotEqual',
    value: function _filterNotEqual(qb, column, value) {

      qb.whereNot(column, value);
    }
  }, {
    key: '_filterLike',
    value: function _filterLike(qb, column, value) {

      qb.whereRaw('lower(' + column + ') like ?', '%' + value.toLowerCase() + '%');
    }
  }, {
    key: '_filterIn',
    value: function _filterIn(qb, column, value) {

      var inArray = _lodash2.default.without(value, 'null');

      if (!_lodash2.default.includes(value, 'null')) return qb.whereIn(column, inArray);

      qb.where(function () {

        this.whereIn(column, inArray).orWhereNull(column);
      });
    }
  }, {
    key: '_filterNotIn',
    value: function _filterNotIn(qb, column, value) {

      var inArray = _lodash2.default.without(value, 'null');

      if (!_lodash2.default.includes(value, 'null')) return qb.whereNotIn(column, inArray);

      qb.where(function () {

        this.whereNotIn(column, inArray).orWhereNotNull(column);
      });
    }
  }, {
    key: '_filterLessThan',
    value: function _filterLessThan(qb, column, value) {

      qb.where(column, '<', value);
    }
  }, {
    key: '_filterLessThanEqualTo',
    value: function _filterLessThanEqualTo(qb, column, value) {

      qb.where(column, '<=', value);
    }
  }, {
    key: '_filterGreaterThan',
    value: function _filterGreaterThan(qb, column, value) {

      qb.where(column, '>', value);
    }
  }, {
    key: '_filterGreaterThanEqualTo',
    value: function _filterGreaterThanEqualTo(qb, column, value) {

      qb.where(column, '>=', value);
    }
  }, {
    key: '_filterDateRange',
    value: function _filterDateRange(qb, column, value) {

      if (value === 'this_week') {

        this._filterRange(qb, column, 0, 'week');
      } else if (value === 'last_week') {

        this._filterRange(qb, column, -1, 'week');
      } else if (value === 'next_week') {

        this._filterRange(qb, column, 1, 'week');
      } else if (value === 'this_month') {

        this._filterRange(qb, column, 0, 'month');
      } else if (value === 'last_month') {

        this._filterRange(qb, column, -1, 'month');
      } else if (value === 'next_month') {

        this._filterRange(qb, column, 1, 'month');
      } else if (value === 'this_quarter') {

        this._filterRange(qb, column, 0, 'quarter');
      } else if (value === 'last_quarter') {

        this._filterRange(qb, column, -1, 'quarter');
      } else if (value === 'next_quarter') {

        this._filterRange(qb, column, 1, 'quarter');
      } else if (value === 'this_year') {

        this._filterRange(qb, column, 0, 'year');
      } else if (value === 'last_year') {

        this._filterRange(qb, column, -1, 'year');
      } else if (value === 'next_year') {

        this._filterRange(qb, column, 1, 'year');
      } else if (value === 'last_30') {

        this._filterDuration(qb, column, -30, 'day');
      } else if (value === 'next_30') {

        this._filterDuration(qb, column, 30, 'day');
      } else if (value === 'last_60') {

        this._filterDuration(qb, column, -60, 'day');
      } else if (value === 'next_60') {

        this._filterDuration(qb, column, 60, 'day');
      } else if (value === 'last_90') {

        this._filterDuration(qb, column, -90, 'day');
      } else if (value === 'next_90') {

        this._filterDuration(qb, column, 90, 'day');
      } else if (value === 'ytd') {

        this._filterBetween(qb, column, (0, _moment2.default)().startOf('year'), (0, _moment2.default)());
      } else if (value === 'ltd') {

        this._filterBetween(qb, column, (0, _moment2.default)('2000-01-01'), (0, _moment2.default)());
      }
    }
  }, {
    key: '_filterRange',
    value: function _filterRange(qb, column, quantity, unit) {

      this._filterBetween(qb, column, (0, _moment2.default)().add(quantity, unit).startOf(unit), (0, _moment2.default)().add(quantity, unit).endOf(unit));
    }
  }, {
    key: '_filterDuration',
    value: function _filterDuration(qb, column, quantity, unit) {

      if (quantity > 0) {

        this._filterBetween(qb, column, (0, _moment2.default)().startOf(unit), (0, _moment2.default)().add(quantity, unit).endOf(unit));
      } else {

        this._filterBetween(qb, column, (0, _moment2.default)().add(quantity, unit).endOf(unit), (0, _moment2.default)().startOf(unit));
      }
    }
  }, {
    key: '_filterBetween',
    value: function _filterBetween(qb, column, start, end) {

      qb.where(column, '>=', start.format('YYYY-MM-DD'));

      qb.where(column, '<=', end.format('YYYY-MM-DD'));
    }
  }, {
    key: '_sortRecords',
    value: function _sortRecords(qb, sorts, tableName) {
      var _this3 = this;

      _lodash2.default.castArray(sorts).map(function (sort) {

        var key = sort.replace(/^-/, '');

        var order = sort[0] === '-' ? 'desc' : 'asc';

        var column = _this3._castColumn(tableName, key);

        qb.orderByRaw(column + ' ' + order);
      });
    }
  }, {
    key: '_castColumn',
    value: function _castColumn(tableName, column) {

      var matches = column.match(/(.*)\.(.*)/);

      return matches ? column : tableName + '.' + column;
    }
  }]);
  return FilterSort;
}();

exports.default = FilterSort;