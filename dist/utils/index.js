'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultResponder = exports.defaultRenderer = exports.defaultProcessor = exports.defaultQuery = undefined;

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _response = require('./response');

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultQuery = exports.defaultQuery = function defaultQuery(req, options, qb, filters) {

  var tableName = options.model.extend().__super__.tableName;

  if (options.ownedByUser) {
    qb = qb.where(tableName + '.user_id', req.user.get('id'));
  }

  if (options.query) {
    options.query(qb, req, filters);
  }

  if (options.softDelete) {
    qb = qb.whereNull('deleted_at');
  }

  return qb;
};

var defaultProcessor = exports.defaultProcessor = function defaultProcessor(req, resolve, reject) {
  return resolve(null);
};

var defaultRenderer = exports.defaultRenderer = function defaultRenderer(options) {

  return function (req, result, resolve, reject) {

    if (!result) return null;

    var renderer = (0, _render2.default)(options);

    var selector = (0, _core.selectFields)(req.query.$select);

    var transform = function transform() {

      if (result.records) return (0, _core.applyToRecords)(req, result, [renderer, selector]);

      return new Promise(function (resolve, reject) {
        return renderer(req, result, resolve, reject);
      }).then(function (result) {

        return new Promise(function (resolve, reject) {
          return selector(req, result, resolve, reject);
        });
      });
    };

    return transform().then(function (result) {

      resolve(result);
    }).catch(function (err) {
      console.log(err);

      reject({ code: 500, message: 'Unable to render response' });
    });
  };
};

var defaultResponder = exports.defaultResponder = function defaultResponder(status, message) {

  return function (req, res, data, resolve, reject) {

    var extra = data ? { data: data } : null;

    (0, _response.succeed)(res, status, message, extra);

    resolve();
  };
};