import { expect } from 'chai'

const buildHandler = require('../index').default({
  knex: {
    transaction: (cb) => cb({
      commit: (result) => Promise.resolve(result),
      rollback: () => {}
    })
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
      processor: (req, trx) => 'foo'
    })

    handler({}, res).then(result => {
      expect(result).to.equal('foo')
      done()
    })

  })

  it('succeeds with a single alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: (req, trx) => { done(); return 'foo' },
      processor: (req, trx) => ''
    })

    handler({}, res)

  })

  it('succeeds with multiple alterRequest hooks', (done) => {

    const handler = buildHandler({
      alterRequest: [
        (req, trx) => req,
        (req, trx) => { done(); return req }
      ],
      processor: (req, trx) => ''
    })

    handler({}, res)

  })

  it('fails with a failed alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: (req, trx) => { throw new Error() },
      processor: (req, trx) => ''
    })

    handler({}, res).then(result => {
      expect(result instanceof Error).to.be.true
      done()
    })

  })

  it('alters the request with alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: [
        (req, trx) => ({
          ...req,
          bar: 2
        }),
        (req, trx) => ({
          ...req,
          baz: 3
        })
      ],
      processor: (req, trx) => {
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

  it('succeeds with a single before hook', (done) => testSingleHookBeforeProcessor('before', done))

  it('succeeds with multiple before hooks', (done) => testMultipleHooksBeforeProcessor('before', done))

  it('fails with a failed before hook', (done) => testFailedHookBeforeProcessor('before', done))

  it('succeeds with a single after hook', (done) => testSingleHookAfterProcessor('after', done))

  it('succeeds with multiple after hooks', (done) => testMultipleHooksAfterProcessor('after', done))

  it('fails with a failed after hook', (done) => testFailedHookAfterProcessor('after', done))

  it('succeeds with a single alterRecord hook', (done) => {

    const handler = buildHandler({
      processor: (req, trx) => '',
      alterRecord: (req, trx, result) => done()
    })

    handler({}, res)

  })

  it('succeeds with multiple alterRecord hooks', (done) => {

    const handler = buildHandler({
      processor: (req, trx) => '',
      alterRecord: [
        (req, trx, result) => '',
        (req, trx, result) => done()
      ]
    })

    handler({}, res)

  })

  it('fails with a failed alterRecord hook', (done) => {

    const handler = buildHandler({
      processor: (req, trx, result) => 'null',
      alterRecord: (req, trx, result) => { throw new Error() }
    })

    handler({}, res).then(result => {
      expect(result instanceof Error).to.be.true
      done()
    })

  })

}

const testSingleHookBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, trx) => done(),
    processor: (req, trx) => 'foo'
  })

  handler({}, res)

}

const testMultipleHooksBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: [
      (req, trx) => '',
      (req, trx) => '',
      (req, trx) => done()
    ],
    processor: (req, trx) => 'foo'
  })

  handler({}, res)

}

const testFailedHookBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, trx, result) => { throw new Error() },
    processor: (req, trx) => 'foo'
  })

  handler({}, res).then(result => {
    expect(result instanceof Error).to.be.true
    done()
  })

}

const testSingleHookAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, trx, result) => done(),
    processor: (req, trx) => 'foo'
  })

  handler({}, res)

}

const testMultipleHooksAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: [
      (req, trx, result) => '',
      (req, trx, result) => '',
      (req, trx, result) => done()
    ],
    processor: (req, trx) => 'foo'
  })

  handler({}, res)

}

const testFailedHookAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, trx, result) => { throw new Error() },
    processor: (req, trx) => 'foo'
  })

  handler({}, res).then(result => {
    expect(result instanceof Error).to.be.true
    done()
  })

}
