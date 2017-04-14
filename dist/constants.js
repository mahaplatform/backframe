'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BACKFRAME_EVENTS = exports.BACKFRAME_EVENTS = ['processor', 'renderer', 'responder'];

var BACKFRAME_HOOKS = exports.BACKFRAME_HOOKS = ['beginHooks', 'alterRequest', 'beforeHooks', 'afterHooks', 'alterResult', 'commitHooks'];

var BACKFRAME_LIFECYCLE = exports.BACKFRAME_LIFECYCLE = [].concat(BACKFRAME_EVENTS, BACKFRAME_HOOKS);