'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _core = require('../core');

var _options = require('../options');

exports.default = function () {

  describe('core', function () {

    describe('mergeHooks', function () {

      it('merges events', function () {

        var plugins = [{
          alterRequest: 1,
          beforeHooks: 1,
          afterHooks: 1,
          alterResult: 1,
          commitHooks: 1
        }, {
          alterRequest: [2, 3],
          beforeHooks: [2, 3],
          afterHooks: [2, 3],
          alterResult: [2, 3],
          commitHooks: [2, 3]
        }];

        var expected = {
          alterRequest: [1, 2, 3],
          beforeHooks: [1, 2, 3],
          afterHooks: [1, 2, 3],
          alterResult: [1, 2, 3],
          commitHooks: [1, 2, 3]
        };

        (0, _chai.expect)((0, _core.mergeHooks)({}, plugins)).to.eql(expected);
      });
    });
  });
};