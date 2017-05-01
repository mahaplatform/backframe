import { expect } from 'chai'
import Backframe from '../index'

export default () => {

  it('returns an object of functions', () => {

    const backframe = Backframe({
      bookshelf: {},
      knex: {},
      redis: {}
    })

    expect(backframe).to.be.an('object')
    expect(backframe.handler).to.be.a('function')
    expect(backframe.resources).to.be.a('function')
    expect(backframe.route).to.be.a('function')
    expect(backframe.router).to.be.a('function')
    expect(backframe.segment).to.be.a('function')
    expect(backframe.table).to.be.a('function')

  })

  it('accepts valid options', () => {

    const backframe = Backframe({
      bookshelf: {},
      knex: {},
      redis: {}
    })

  })

  it('rejects invalid options', (done) => {

    try {
      Backframe({ foo: 1 })
    } catch(e) {
      done()
    }

  })

}
