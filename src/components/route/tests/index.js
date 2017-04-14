import { expect } from 'chai'
import buildRoute from '../index'

export default () => {

  it('requires a method and path', (done) => {

    try {
      buildRoute()()
    } catch(e) {
      done()
    }

  })

  it('succeeds with only a method, path, and handler', () => {

    const route = buildRoute()({
      method: 'get',
      path: '/foo',
      handler: (req, res) => {}
    })

  })

}
