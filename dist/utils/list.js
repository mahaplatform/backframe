'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.daterange = exports.filter = exports.extractSort = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        qb.where(key, filters[key].$eq);
      }
    } else if (filters[key].$ne) {

      qb.whereNot(key, filters[key].$ne);
    } else if (filters[key].$lk) {

      qb.whereRaw('LOWER(' + key + ') LIKE ?', '%' + filters[key].$lk.toLowerCase() + '%');
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