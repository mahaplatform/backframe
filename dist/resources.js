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

var _destroy_route = require('./resources/destroy_route');

var _destroy_route2 = _interopRequireDefault(_destroy_route);

var _create_route = require('./resources/create_route');

var _create_route2 = _interopRequireDefault(_create_route);

var _update_route = require('./resources/update_route');

var _update_route2 = _interopRequireDefault(_update_route);

var _list_route = require('./resources/list_route');

var _list_route2 = _interopRequireDefault(_list_route);

var _show_route = require('./resources/show_route');

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

    _this.collectionActions = null;
    _this.filterParams = null;
    _this.memberActions = null;
    _this.searchParams = null;
    _this.sortParams = null;
    _this.virtualFilters = null;

    if (config.collectionActions) _this.setCollectionActions(config.collectionActions);
    if (config.filterParams) _this.setFilterParams(config.filterParams);
    if (config.memberActions) _this.setMemberActions(config.memberActions);
    if (config.searchParams) _this.setSearchParams(config.searchParams);
    if (config.sortParams) _this.setSortParams(config.sortParams);
    if (config.virtualFilters) _this.setVirtualFilters(config.virtualFilters);
    return _this;
  }

  (0, _createClass3.default)(Resources, [{
    key: 'setFilterParams',
    value: function setFilterParams(params) {
      this.filterParams = _lodash2.default.castArray(params);
    }
  }, {
    key: 'setSearchParams',
    value: function setSearchParams(params) {
      this.searchParams = _lodash2.default.castArray(params);
    }
  }, {
    key: 'setSortParams',
    value: function setSortParams(params) {
      this.sortParams = _lodash2.default.castArray(params);
    }
  }, {
    key: 'setVirtualFilters',
    value: function setVirtualFilters(virtualFilters) {
      this.virtualFilters = virtualFilters;
    }
  }, {
    key: 'setCollectionActions',
    value: function setCollectionActions(actions) {
      this.collectionActions = _lodash2.default.castArray(actions);
    }
  }, {
    key: 'addCollectionAction',
    value: function addCollectionAction(action) {
      this._addItem('collectionActions', action);
    }
  }, {
    key: 'setMemberActions',
    value: function setMemberActions(actions) {
      this.memberActions = _lodash2.default.castArray(actions);
    }
  }, {
    key: 'addMemberAction',
    value: function addMemberAction(action) {
      this._addItem('memberActions', action);
    }
  }, {
    key: 'render',
    value: function render() {
      var resourcesPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var _this2 = this;

      var resourcesOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var resourcesHooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


      return this._getRoutes().map(function (route) {

        var path = '' + (resourcesPath || '') + (_this2.path || '');

        var options = (0, _extends3.default)({}, resourcesOptions, _this2._getDestructuredOptions(_this2.customOptions, route.action));

        var hooks = _this2._mergeHooks(resourcesHooks, _this2.hooks);

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
                  id: req.params.id
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

      if (this._includeAction('list')) routes.push(this._getListRoute());

      if (this._includeAction('create')) routes.push(this._getCreateRoute());

      if (this.collectionActions) {

        this.collectionActions.map(function (route) {
          return routes.push(_this3._getCollectionRoute(route));
        });
      }

      if (this._includeAction('show')) routes.push(this._getShowRoute());

      if (this._includeAction('update')) routes.push(this._getUpdateRoute());

      if (this._includeAction('destroy')) routes.push(this._getDestroyRoute());

      if (this.memberActions) {

        this.memberActions.map(function (route) {
          return routes.push(_this3._getMemberRoute(route));
        });
      }

      return routes;
    }
  }, {
    key: '_getListRoute',
    value: function _getListRoute() {
      return new _list_route2.default({
        defaultQuery: this._getDestructuredOption(this, 'defaultQuery', 'list'),
        defaultSort: this._getDestructuredOption(this, 'defaultSort', 'list'),
        filterParams: this._getDestructuredOption(this, 'filterParams', 'list'),
        model: this._getDestructuredOption(this, 'model', 'list'),
        serializer: this._getDestructuredOption(this, 'serializer', 'list'),
        searchParams: this._getDestructuredOption(this, 'searchParams', 'list'),
        sortParams: this._getDestructuredOption(this, 'sortParams', 'list'),
        withRelated: this._getDestructuredOption(this, 'withRelated', 'list')
      });
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
      // theres a better way to do this
      route.path = '/:id' + route.path;
      route.hooks.alterRequest.push(this._fetchResource);
      return route;
    }
  }]);
  return Resources;
}(_collection2.default);

exports.default = Resources;