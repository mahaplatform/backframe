import { expect } from 'chai'

const buildHandler = require('../index').default()

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
      processor: (req, resolve, reject) => { resolve('foo')}
    })

    handler({}, res).then(result => {
      expect(result).to.equal('foo')
      done()
    })

  })

  it('succeeds with a single alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: (req, resolve, reject) => { resolve(req); done() },
      processor: (req, resolve, reject) => resolve()
    })

    handler({}, res)

  })

  it('succeeds with multiple alterRequest hooks', (done) => {

    const handler = buildHandler({
      alterRequest: [
        (req, resolve, reject) => resolve(),
        (req, resolve, reject) => { resolve(req); done() }
      ],
      processor: (req, resolve, reject) => resolve()
    })

    handler({}, res)

  })

  it('fails with a failed alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: (req, resolve, reject) => reject(),
      processor: (req, resolve, reject) => resolve()
    })

    handler({}, res).catch(err => done())

  })

  it('alters the request with alterRequest hook', (done) => {

    const handler = buildHandler({
      alterRequest: [
        (req, resolve, reject) => {
          resolve({
            ...req,
            bar: 2
          })
        }, (req, resolve, reject) => {
          resolve({
            ...req,
            baz: 3
          })
        }
      ],
      processor: (req, resolve, reject) => {
        expect(req).to.eql({
          foo: 1,
          bar: 2,
          baz: 3
        })
        resolve(done())
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

  it('succeeds with a single alterResult hook', (done) => {

    const handler = buildHandler({
      processor: (req, resolve, reject) => resolve(),
      alterResult: (req, result, resolve, reject) => resolve(done())
    })

    handler({}, res)

  })

  it('succeeds with multiple alterResult hooks', (done) => {

    const handler = buildHandler({
      processor: (req, resolve, reject) => resolve(),
      alterResult: [
        (req, result, resolve, reject) => resolve(),
        (req, result, resolve, reject) => resolve(done())
      ]
    })

    handler({}, res)

  })

  it('fails with a failed alterResult hook', (done) => {

    const handler = buildHandler({
      processor: (req, result, resolve, reject) => resolve(),
      alterResult: (req, result, resolve, reject) => reject()
    })

    handler({}, res).catch(err => done())

  })

}

const testSingleHookBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, resolve, reject) => resolve(done()),
    processor: (req, resolve, reject) => resolve('foo')
  })

  handler({}, res)

}

const testMultipleHooksBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: [
      (req, resolve, reject) => resolve(),
      (req, resolve, reject) => resolve(),
      (req, resolve, reject) => resolve(done())
    ],
    processor: (req, resolve, reject) => resolve('foo')
  })

  handler({}, res)

}

const testFailedHookBeforeProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, resolve, reject) => reject(),
    processor: (req, resolve, reject) => resolve('foo')
  })

  handler({}, res).catch(err => done())

}

const testSingleHookAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, result, resolve, reject) => resolve(done()),
    processor: (req, resolve, reject) => resolve('foo')
  })

  handler({}, res)

}

const testMultipleHooksAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: [
      (req, result, resolve, reject) => resolve(),
      (req, result, resolve, reject) => resolve(),
      (req, result, resolve, reject) => resolve(done())
    ],
    processor: (req, resolve, reject) => resolve('foo')
  })

  handler({}, res)

}

const testFailedHookAfterProcessor = (key, done) => {

  const handler = buildHandler({
    [key]: (req, result, resolve, reject) => reject(),
    processor: (req, resolve, reject) => resolve('foo')
  })

  handler({}, res).catch(err => done())

}
