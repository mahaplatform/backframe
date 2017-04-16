'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (buildRoute) {

  var destroyRelated = function destroyRelated(options, resource, resolve, reject) {

    if (!options.dependents) return resolve(resource);

    return _bluebird2.default.each(options.dependents, function (dependent, index, length) {

      return dependent.model.where(_defineProperty({}, dependent.foreignKey, resource.get('id'))).fetchAll().then(function (results) {

        var records = results.map(function (result) {
          return result;
        });

        return _bluebird2.default.each(records, function (record, index, length) {

          return dependent.strategy === 'destroy' ? record.destroy() : record.save(_defineProperty({}, dependent.foreignKey, null), { patch: true });
        });
      });
    }).then(resolve(resource));
  };

  var destroyResource = function destroyResource(options, resource) {

    return options.softDelete ? resource.save({ deleted_at: new Date() }, { patch: true }) : resource.destroy();
  };

  var processor = function processor(options) {
    return function (req, resolve, reject) {

      (0, _load2.default)(options)(req).then(function (resource) {

        return new _bluebird2.default(function (resolve, reject) {
          return destroyRelated(options, resource, resolve, reject);
        });
      }).then(function (resource) {

        return destroyResource(options, resource);
      }).then(function () {

        resolve();
      }).catch(function (err) {

        if (err.errors) return reject({ code: 422, message: 'Unable to delete ' + options.name, errors: err.toJSON() });

        throw err;
      });
    };
  };

  return buildRoute({
    method: 'delete',
    path: '/:id',
    processor: processor,
    responder: (0, _utils.defaultResponder)('Successfully deleted record')
  });
};