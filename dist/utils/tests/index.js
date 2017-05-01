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
          before: 1,
          after: 1,
          alterRecord: 1
        }, {
          alterRequest: [2, 3],
          before: [2, 3],
          after: [2, 3],
          alterRecord: [2, 3]
        }];

        var expected = {
          alterRequest: [1, 2, 3],
          before: [1, 2, 3],
          after: [1, 2, 3],
          alterRecord: [1, 2, 3]
        };

        (0, _chai.expect)((0, _core.mergeHooks)({}, plugins)).to.eql(expected);
      });
    });
  });
};