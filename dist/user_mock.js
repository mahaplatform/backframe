'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

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

          return (0, _bluebird.resolve)(results);
        }

      };
    }

  };
};