import { expect } from 'chai'

const buildHandler = require('../index').default({
  bookshelf: {
    transaction: (cb) => cb(null) 
  }
})

const res = {
  status: code => ({
    json: json => {}
  })
}

export default () => {

  it('requires a processor', (done) => {

    try {
      buildHandler({})
    } catch(e) {
      done()
    }

  })

  it('executes with only a processor', (done) => {

    const handler = buildHandler({
      processor: req => 'foo'
    })

    handler({}, res).then(result => {
      expect(result).to.equal('foo')
      done()
    })

  })

  it('succeeds with a single alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: req => { done(); return 'foo' },
      processor: req => ''
    })

    handler({}, res)

  })

  it('succeeds with multiple alterRequest hooks', (done) => {

    const handler = buildHandler({
      alterRequest: [
        req => req,
        req => { done(); return req }
      ],
      processor: req => ''
    })

    handler({}, res)

  })

  it('fails with a failed alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: req => { throw new Error() },
      processor: req => ''
    })

    handler({}, res).catch(err => done())

  })

  it('alters the request with alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: [
        req => ({
          ...req,
          bar: 2
        }),
        req => ({
          ...req,
          baz: 3
        })
      ],
      processor: req => {
        expect(req).to.eql({
          foo: 1,
          bar: 2,
          baz: 3
        })
        done()
      }
    })

    handler({ foo: 1 }, res)

  })

  it('succeeds with a single before hook', (done) => testSingleHookBeforeProcessor('beforeHooks', done))

  it('succeeds with multiple before hooks', (done) => testMultipleHooksBeforeProcessor('beforeHooks', done))

  it('fails with a failed before hook', (done) => testFailedHookBeforeProcessor('beforeHooks', done))

  it('succeeds with a single after hook', (done) => testSingleHookAfterProcessor('afterHooks', done))

  it('succeeds with multiple after hooks', (done) => testMultipleHooksAfterProcessor('afterHooks', done))

  it('fails with a failed after hook', (done) => testFailedHookAfterProcessor('afterHooks', done))

  it('succeeds with a single alterRecord hook', (done) => {

    const handler = buildHandler({
      processor: req => '',
      alterRecord: (req, result) => done()
    })

    handler({}, res)

  })

  it('succeeds with multiple alterRecord hooks', (done) => {

    const handler = buildHandler({
      processor: req => '',
      alterRecord: [
        (req, result) => '',
        (req, result) => done()
      ]
    })

    handler({}, res)

  })

  it('fails with a failed alterRecord hook', (done) => {

    const handler = buildHandler({
      processor: (req, result) => 'null',
      alterRecord: (req, result) => { throw new Error() }
    })

    handler({}, res).catch(err => done())

  })

}

const testSingleHookBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: req => done(),
    processor: req => 'foo'
  })

  handler({}, res)

}

const testMultipleHooksBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: [
      req => '',
      req => '',
      req => done()
    ],
    processor: req => 'foo'
  })

  handler({}, res)

}

const testFailedHookBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, result) => { throw new Error() },
    processor: req => 'foo'
  })

  handler({}, res).catch(err => done())

}

const testSingleHookAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, result) => done(),
    processor: req => 'foo'
  })

  handler({}, res)

}

const testMultipleHooksAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: [
      (req, result) => '',
      (req, result) => '',
      (req, result) => done()
    ],
    processor: req => 'foo'
  })

  handler({}, res)

}

const testFailedHookAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, result) => { throw new Error() },
    processor: req => 'foo'
  })

  handler({}, res).catch(err => done())

}
