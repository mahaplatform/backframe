'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildHandler = require('../index').default({
  bookshelf: {
    transaction: function transaction(cb) {
      return cb(null);
    }
  }
});

var res = {
  status: function status(code) {
    return {
      json: function json(_json) {}
    };
  }
};

exports.default = function () {

  it('requires a processor', function (done) {

    try {
      buildHandler({});
    } catch (e) {
      done();
    }
  });

  it('executes with only a processor', function (done) {

    var handler = buildHandler({
      processor: function processor(req) {
        return 'foo';
      }
    });

    handler({}, res).then(function (result) {
      (0, _chai.expect)(result).to.equal('foo');
      done();
    });
  });

  it('succeeds with a single alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: function alterRequest(req) {
        done();return 'foo';
      },
      processor: function processor(req) {
        return '';
      }
    });

    handler({}, res);
  });

  it('succeeds with multiple alterRequest hooks', function (done) {

    var handler = buildHandler({
      alterRequest: [function (req) {
        return req;
      }, function (req) {
        done();return req;
      }],
      processor: function processor(req) {
        return '';
      }
    });

    handler({}, res);
  });

  it('fails with a failed alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: function alterRequest(req) {
        throw new Error();
      },
      processor: function processor(req) {
        return '';
      }
    });

    handler({}, res).catch(function (err) {
      return done();
    });
  });

  it('alters the request with alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: [function (req) {
        return (0, _extends3.default)({}, req, {
          bar: 2
        });
      }, function (req) {
        return (0, _extends3.default)({}, req, {
          baz: 3
        });
      }],
      processor: function processor(req) {
        (0, _chai.expect)(req).to.eql({
          foo: 1,
          bar: 2,
          baz: 3
        });
        done();
      }
    });

    handler({ foo: 1 }, res);
  });

  it('succeeds with a single before hook', function (done) {
    return testSingleHookBeforeProcessor('beforeHooks', done);
  });

  it('succeeds with multiple before hooks', function (done) {
    return testMultipleHooksBeforeProcessor('beforeHooks', done);
  });

  it('fails with a failed before hook', function (done) {
    return testFailedHookBeforeProcessor('beforeHooks', done);
  });

  it('succeeds with a single after hook', function (done) {
    return testSingleHookAfterProcessor('afterHooks', done);
  });

  it('succeeds with multiple after hooks', function (done) {
    return testMultipleHooksAfterProcessor('afterHooks', done);
  });

  it('fails with a failed after hook', function (done) {
    return testFailedHookAfterProcessor('afterHooks', done);
  });

  it('succeeds with a single alterRecord hook', function (done) {

    var handler = buildHandler({
      processor: function processor(req) {
        return '';
      },
      alterRecord: function alterRecord(req, result) {
        return done();
      }
    });

    handler({}, res);
  });

  it('succeeds with multiple alterRecord hooks', function (done) {

    var handler = buildHandler({
      processor: function processor(req) {
        return '';
      },
      alterRecord: [function (req, result) {
        return '';
      }, function (req, result) {
        return done();
      }]
    });

    handler({}, res);
  });

  it('fails with a failed alterRecord hook', function (done) {

    var handler = buildHandler({
      processor: function processor(req, result) {
        return 'null';
      },
      alterRecord: function alterRecord(req, result) {
        throw new Error();
      }
    });

    handler({}, res).catch(function (err) {
      return done();
    });
  });
};

var testSingleHookBeforeProcessor = function testSingleHookBeforeProcessor(key, done) {
  var _buildHandler;

  var handler = buildHandler((_buildHandler = {}, (0, _defineProperty3.default)(_buildHandler, key, function (req) {
    return done();
  }), (0, _defineProperty3.default)(_buildHandler, 'processor', function processor(req) {
    return 'foo';
  }), _buildHandler));

  handler({}, res);
};

var testMultipleHooksBeforeProcessor = function testMultipleHooksBeforeProcessor(key, done) {
  var _buildHandler2;

  var handler = buildHandler((_buildHandler2 = {}, (0, _defineProperty3.default)(_buildHandler2, key, [function (req) {
    return '';
  }, function (req) {
    return '';
  }, function (req) {
    return done();
  }]), (0, _defineProperty3.default)(_buildHandler2, 'processor', function processor(req) {
    return 'foo';
  }), _buildHandler2));

  handler({}, res);
};

var testFailedHookBeforeProcessor = function testFailedHookBeforeProcessor(key, done) {
  var _buildHandler3;

  var handler = buildHandler((_buildHandler3 = {}, (0, _defineProperty3.default)(_buildHandler3, key, function (req, result) {
    throw new Error();
  }), (0, _defineProperty3.default)(_buildHandler3, 'processor', function processor(req) {
    return 'foo';
  }), _buildHandler3));

  handler({}, res).catch(function (err) {
    return done();
  });
};

var testSingleHookAfterProcessor = function testSingleHookAfterProcessor(key, done) {
  var _buildHandler4;

  var handler = buildHandler((_buildHandler4 = {}, (0, _defineProperty3.default)(_buildHandler4, key, function (req, result) {
    return done();
  }), (0, _defineProperty3.default)(_buildHandler4, 'processor', function processor(req) {
    return 'foo';
  }), _buildHandler4));

  handler({}, res);
};

var testMultipleHooksAfterProcessor = function testMultipleHooksAfterProcessor(key, done) {
  var _buildHandler5;

  var handler = buildHandler((_buildHandler5 = {}, (0, _defineProperty3.default)(_buildHandler5, key, [function (req, result) {
    return '';
  }, function (req, result) {
    return '';
  }, function (req, result) {
    return done();
  }]), (0, _defineProperty3.default)(_buildHandler5, 'processor', function processor(req) {
    return 'foo';
  }), _buildHandler5));

  handler({}, res);
};

var testFailedHookAfterProcessor = function testFailedHookAfterProcessor(key, done) {
  var _buildHandler6;

  var handler = buildHandler((_buildHandler6 = {}, (0, _defineProperty3.default)(_buildHandler6, key, function (req, result) {
    throw new Error();
  }), (0, _defineProperty3.default)(_buildHandler6, 'processor', function processor(req) {
    return 'foo';
  }), _buildHandler6));

  handler({}, res).catch(function (err) {
    return done();
  });
};