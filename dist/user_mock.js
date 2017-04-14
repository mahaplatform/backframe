'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (results) {
  return {

    extend: function extend() {
      return {
        __super__: {
          tableName: 'users'
        }
      };
    },

    query: function query(qb) {
      return {

        fetch: function fetch(options) {

          return _bluebird2.default.resolve(results);
        }

      };
    }

  };
};