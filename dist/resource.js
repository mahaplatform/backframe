'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _destroy_route = require('./resource/destroy_route');

var _destroy_route2 = _interopRequireDefault(_destroy_route);

var _create_route = require('./resource/create_route');

var _create_route2 = _interopRequireDefault(_create_route);

var _update_route = require('./resource/update_route');

var _update_route2 = _interopRequireDefault(_update_route);

var _show_route = require('./resource/show_route');

var _show_route2 = _interopRequireDefault(_show_route);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resources = function (_Collection) {
  (0, _inherits3.default)(Resources, _Collection);

  function Resources() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Resources);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Resources.__proto__ || Object.getPrototypeOf(Resources)).call(this, config));

    _this.actions = null;

    if (config.actions) _this.setActions(config.actions);
    return _this;
  }

  (0, _createClass3.default)(Resources, [{
    key: 'setActions',
    value: function setActions(actions) {
      this.actions = _lodash2.default.castArray(actions);
    }
  }, {
    key: 'addAction',
    value: function addAction(action) {
      this._addItem('actions', action);
    }
  }, {
    key: 'render',
    value: function render() {
      var resourcePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var _this2 = this;

      var resourceOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var resourceHooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


      return this._getRoutes().map(function (route) {

        var path = '' + (resourcePath || '') + (_this2.path || '');

        var options = (0, _extends3.default)({}, resourceOptions, _this2._getDestructuredOptions(_this2.customOptions, route.action));

        var hooks = _this2._mergeHooks(resourceHooks, _this2.hooks);

        return route.render(path, options, hooks);
      });
    }
  }, {
    key: '_fetchResource',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return options.model.where({
                  id: 1
                }).fetch({
                  transacting: trx
                });

              case 2:
                req.resource = _context.sent;

                if (!req.resource) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', req);

              case 5:
                throw new _error2.default({
                  code: 404,
                  message: 'Unable to load record'
                });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _fetchResource(_x5, _x6, _x7) {
        return _ref.apply(this, arguments);
      }

      return _fetchResource;
    }()
  }, {
    key: '_getRoutes',
    value: function _getRoutes() {
      var _this3 = this;

      var routes = [];

      this.actions.map(function (route) {
        return routes.push(_this3._getCollectionRoute(route));
      });

      if (this._includeAction('create')) routes.push(this._getCreateRoute());

      if (this._includeAction('show')) routes.push(this._getShowRoute());

      if (this._includeAction('update')) routes.push(this._getUpdateRoute());

      if (this._includeAction('destroy')) routes.push(this._getDestroyRoute());

      return routes;
    }
  }, {
    key: '_getCreateRoute',
    value: function _getCreateRoute() {
      return new _create_route2.default({
        allowedParams: this._getDestructuredOption(this, 'allowedParams', 'create'),
        model: this._getDestructuredOption(this, 'model', 'create'),
        serializer: this._getDestructuredOption(this, 'serializer', 'create'),
        virtualParams: this._getDestructuredOption(this, 'virtualParams', 'create')
      });
    }
  }, {
    key: '_getShowRoute',
    value: function _getShowRoute() {
      return new _show_route2.default({
        alterRequest: this._fetchResource,
        model: this._getDestructuredOption(this, 'model', 'show'),
        serializer: this._getDestructuredOption(this, 'serializer', 'show')
      });
    }
  }, {
    key: '_getUpdateRoute',
    value: function _getUpdateRoute() {
      return new _update_route2.default({
        alterRequest: this._fetchResource,
        allowedParams: this._getDestructuredOption(this, 'allowedParams', 'update'),
        model: this._getDestructuredOption(this, 'model', 'update'),
        serializer: this._getDestructuredOption(this, 'serializer', 'update'),
        virtualParams: this._getDestructuredOption(this, 'virtualParams', 'update')
      });
    }
  }, {
    key: '_getDestroyRoute',
    value: function _getDestroyRoute() {
      return new _destroy_route2.default({
        alterRequest: this._fetchResource,
        model: this._getDestructuredOption(this, 'model', 'destroy'),
        serializer: this._getDestructuredOption(this, 'serializer', 'destroy')
      });
    }
  }, {
    key: '_getCollectionRoute',
    value: function _getCollectionRoute(route) {
      return route;
    }
  }, {
    key: '_getMemberRoute',
    value: function _getMemberRoute(route) {
      route.prependPath('/:id');
      route.prependAlterRequest(this._fetchResource);
      return route;
    }
  }]);
  return Resources;
}(_collection2.default);

exports.default = Resources;