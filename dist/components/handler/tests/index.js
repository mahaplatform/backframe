'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chai = require('chai');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildHandler = require('../index').default();

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
      processor: function processor(req, resolve, reject) {
        return resolve('foo');
      }
    });

    handler({}, res).then(function (result) {
      (0, _chai.expect)(result).to.equal('foo');
      done();
    });
  });
  it('succeeds with a single begin hook', function (done) {
    return testSingleHookBeforeProcessor('beginHooks', done);
  });

  it('succeeds with multiple beginHooks hooks', function (done) {
    return testMultipleHooksBeforeProcessor('beginHooks', done);
  });

  it('fails with a failed beginHooks hook', function (done) {
    return testFailedHookBeforeProcessor('beginHooks', done);
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

  it('succeeds with a single commit hook', function (done) {
    return testSingleHookAfterProcessor('commitHooks', done);
  });

  it('succeeds with multiple commit hooks', function (done) {
    return testMultipleHooksAfterProcessor('commitHooks', done);
  });

  it('fails with a failed commit hook', function (done) {
    return testFailedHookAfterProcessor('commitHooks', done);
  });

  it('succeeds with a single alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: function alterRequest(req, resolve, reject) {
        return resolve(done());
      },
      processor: function processor(req, resolve, reject) {
        return resolve();
      }
    });

    handler({}, res);
  });

  it('succeeds with multiple alterRequest hooks', function (done) {

    var handler = buildHandler({
      alterRequest: [function (req, resolve, reject) {
        return resolve();
      }, function (req, resolve, reject) {
        return resolve(done());
      }],
      processor: function processor(req, resolve, reject) {
        return resolve();
      }
    });

    handler({}, res);
  });

  it('fails with a failed alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: function alterRequest(req, resolve, reject) {
        return reject();
      },
      processor: function processor(req, resolve, reject) {
        return resolve();
      }
    });

    handler({}, res).catch(function (err) {
      return done();
    });
  });

  it('succeeds with a single alterResult hook', function (done) {

    var handler = buildHandler({
      processor: function processor(req, resolve, reject) {
        return resolve();
      },
      alterResult: function alterResult(req, result, resolve, reject) {
        return resolve(done());
      }
    });

    handler({}, res);
  });

  it('succeeds with multiple alterResult hooks', function (done) {

    var handler = buildHandler({
      processor: function processor(req, resolve, reject) {
        return resolve();
      },
      alterResult: [function (req, result, resolve, reject) {
        return resolve();
      }, function (req, result, resolve, reject) {
        return resolve(done());
      }]
    });

    handler({}, res);
  });

  it('fails with a failed alterResult hook', function (done) {

    var handler = buildHandler({
      processor: function processor(req, result, resolve, reject) {
        return resolve();
      },
      alterResult: function alterResult(req, result, resolve, reject) {
        return reject();
      }
    });

    handler({}, res).catch(function (err) {
      return done();
    });
  });

  it('alters the request with alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: [function (req, resolve, reject) {
        resolve(_extends({}, req, {
          bar: 2
        }));
      }, function (req, resolve, reject) {
        resolve(_extends({}, req, {
          baz: 3
        }));
      }],
      processor: function processor(req, resolve, reject) {
        (0, _chai.expect)(req).to.eql({
          foo: 1,
          bar: 2,
          baz: 3
        });
        resolve(done());
      }
    });

    handler({ foo: 1 }, res);
  });
};

var testSingleHookBeforeProcessor = function testSingleHookBeforeProcessor(key, done) {
  var _buildHandler;

  var handler = buildHandler((_buildHandler = {}, _defineProperty(_buildHandler, key, function (req, resolve, reject) {
    return resolve(done());
  }), _defineProperty(_buildHandler, 'processor', function processor(req, resolve, reject) {
    return resolve('foo');
  }), _buildHandler));

  handler({}, res);
};

var testMultipleHooksBeforeProcessor = function testMultipleHooksBeforeProcessor(key, done) {
  var _buildHandler2;

  var handler = buildHandler((_buildHandler2 = {}, _defineProperty(_buildHandler2, key, [function (req, resolve, reject) {
    return resolve();
  }, function (req, resolve, reject) {
    return resolve();
  }, function (req, resolve, reject) {
    return resolve(done());
  }]), _defineProperty(_buildHandler2, 'processor', function processor(req, resolve, reject) {
    return resolve('foo');
  }), _buildHandler2));

  handler({}, res);
};

var testFailedHookBeforeProcessor = function testFailedHookBeforeProcessor(key, done) {
  var _buildHandler3;

  var handler = buildHandler((_buildHandler3 = {}, _defineProperty(_buildHandler3, key, function (req, resolve, reject) {
    return reject();
  }), _defineProperty(_buildHandler3, 'processor', function processor(req, resolve, reject) {
    return resolve('foo');
  }), _buildHandler3));

  handler({}, res).catch(function (err) {
    return done();
  });
};

var testSingleHookAfterProcessor = function testSingleHookAfterProcessor(key, done) {
  var _buildHandler4;

  var handler = buildHandler((_buildHandler4 = {}, _defineProperty(_buildHandler4, key, function (req, result, resolve, reject) {
    return resolve(done());
  }), _defineProperty(_buildHandler4, 'processor', function processor(req, resolve, reject) {
    return resolve('foo');
  }), _buildHandler4));

  handler({}, res);
};

var testMultipleHooksAfterProcessor = function testMultipleHooksAfterProcessor(key, done) {
  var _buildHandler5;

  var handler = buildHandler((_buildHandler5 = {}, _defineProperty(_buildHandler5, key, [function (req, result, resolve, reject) {
    return resolve();
  }, function (req, result, resolve, reject) {
    return resolve();
  }, function (req, result, resolve, reject) {
    return resolve(done());
  }]), _defineProperty(_buildHandler5, 'processor', function processor(req, resolve, reject) {
    return resolve('foo');
  }), _buildHandler5));

  handler({}, res);
};

var testFailedHookAfterProcessor = function testFailedHookAfterProcessor(key, done) {
  var _buildHandler6;

  var handler = buildHandler((_buildHandler6 = {}, _defineProperty(_buildHandler6, key, function (req, result, resolve, reject) {
    return reject();
  }), _defineProperty(_buildHandler6, 'processor', function processor(req, resolve, reject) {
    return resolve('foo');
  }), _buildHandler6));

  handler({}, res).catch(function (err) {
    return done();
  });
};