'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _options = require('../../utils/options');

exports.default = function () {
  var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var TYPES = {
    name: { type: 'string', required: true },
    options: { type: 'object', required: false },
    alterRequest: { type: ['function', 'function[]'], required: false },
    alterRecord: { type: ['function', 'function[]'], required: false },
    before: { type: ['function', 'function[]'], required: false },
    processor: { type: 'function', required: false },
    renderer: { type: 'function', required: false },
    responder: { type: 'function', required: false }
  };

  (0, _options.validateOptions)('plugin', userOptions, TYPES);

  return userOptions;
};