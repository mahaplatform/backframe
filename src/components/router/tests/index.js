import { expect } from 'chai'

const buildRouter = require('../index').default()

export default () => {

  it('fails without route option', (done) => {

    try {
      buildRouter()
    } catch(e) {
      done()
    }

  })

  it('fails with invalid options', (done) => {

    try {
      buildRouter({ foo: 'bar' })
    } catch(e) {
      done()
    }

  })

  it('succeeds with valid options', () => {

    const router = buildRouter({
      routes: [
        {
          method: 'get',
          path: '/foo',
          handler: (req, res) => {}
        }
      ]
    })

  })

}
