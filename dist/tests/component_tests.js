'use strict';

var _chai = require('chai');

var _component = require('../objects/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('component', function () {

  it('should be instantiated by an object', function () {

    var component = new _component2.default({
      alterRequest: function alterRequest(req) {
        return req;
      },
      beforeProcessor: function beforeProcessor(req) {},
      afterProcessor: function afterProcessor(req, result) {
        return result;
      },
      alterRecord: function alterRecord(req, record) {
        return record;
      },
      beforeCommit: function beforeCommit(req, result) {},
      afterCommit: function afterCommit(req, result) {},
      beforeRollback: function beforeRollback(req, result) {}
    });

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(1);
    (0, _chai.expect)(component.beforeProcessor.length).to.be.eql(1);
    (0, _chai.expect)(component.afterProcessor.length).to.be.eql(1);
    (0, _chai.expect)(component.alterRecord.length).to.be.eql(1);
    (0, _chai.expect)(component.beforeCommit.length).to.be.eql(1);
    (0, _chai.expect)(component.afterCommit.length).to.be.eql(1);
    (0, _chai.expect)(component.beforeRollback.length).to.be.eql(1);
  });

  it('appends a single hook', function () {

    var component = new _component2.default();

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(0);

    component.appendAlterRequest(function (req) {
      return req;
    });

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(1);
  });

  it('appends multiple hooks', function () {

    var component = new _component2.default();

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(0);

    component.appendAlterRequest([function (req) {
      return req;
    }, function (req) {
      return req;
    }]);

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(2);
  });

  it('prepends a single hook', function () {

    var component = new _component2.default();

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(0);

    component.prependAlterRequest(function (req) {
      return req;
    });

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(1);
  });

  it('prepends multiple hooks', function () {

    var component = new _component2.default();

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(0);

    component.prependAlterRequest([function (req) {
      return req;
    }, function (req) {
      return req;
    }]);

    (0, _chai.expect)(component.alterRequest.length).to.be.eql(2);
  });
});