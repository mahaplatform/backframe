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
          beforeProcessor: 1,
          afterProcessor: 1,
          alterRecord: 1
        }, {
          alterRequest: [2, 3],
          beforeProcessor: [2, 3],
          afterProcessor: [2, 3],
          alterRecord: [2, 3]
        }];

        var expected = {
          alterRequest: [1, 2, 3],
          beforeProcessor: [1, 2, 3],
          afterProcessor: [1, 2, 3],
          alterRecord: [1, 2, 3]
        };

        (0, _chai.expect)((0, _core.mergeHooks)({}, plugins)).to.eql(expected);
      });
    });
  });
};