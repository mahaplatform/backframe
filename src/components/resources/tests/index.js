import { expect } from 'chai'
import _ from 'lodash'
import UserMock from '../../../user_mock'
import * as constants from '../../../constants'

const buildResources = require('../index').default()

export default () => {

  it('requires a name and model', (done) => {

    try {
      buildResources()
    } catch(e) {
      done()
    }

  })

  it('succeeds with required options', () => {

    const routes = buildResources({
      name: 'user',
      model: UserMock([])
    })

    expect(routes).to.be.an('array')
    expect(routes.length).to.eql(6)
    expect(routes[0]).to.be.an('object')
    expect(routes[1]).to.be.an('object')
    expect(routes[2]).to.be.an('object')
    expect(routes[3]).to.be.an('object')
    expect(routes[4]).to.be.an('object')
    expect(routes[5]).to.be.an('object')

  })

  it('sets a default path', () => {

    const routes = buildResources({
      name: 'user',
      model: UserMock([])
    })

    expect(routes[0].options.path).to.equal('users')

  })

  it('set a override path', () => {

    const routes = buildResources({
      name: 'user',
      model: UserMock([]),
      path: 'people'
    })

    expect(routes[0].options.path).to.equal('people')

  })

  describe('list route', () => {

    it('succeeds with basic options', () => {

      const routes = buildResources({
        name: 'user',
        model: UserMock([])
      })

      const list = routes[0]

      expect(list).to.include.keys(['method','path','handler','options'])
      expect(list.method).to.equal('get')
      expect(list.path).to.equal('/users')
      expect(list.handler).to.include.keys(constants.BACKFRAME_LIFECYCLE)
      expect(list.handler.alterRequest).to.be.empty
      expect(list.handler.beforeHooks.length).to.equal(1)
      expect(list.handler.afterHooks).to.be.empty
      expect(list.handler.alterResult).to.be.empty
      expect(list.handler.processor).to.be.a('function')
      expect(list.handler.renderer).to.be.a('function')
      expect(list.handler.responder).to.be.a('function')

    })

  })

  describe('show route', () => {
    it('succeeds', () => {
    })
  })

  describe('create route', () => {
    it('succeeds', () => {
    })
  })

  describe('edit route', () => {
    it('succeeds', () => {
    })
  })

  describe('update route', () => {
    it('succeeds', () => {
    })
  })

  describe('destroy route', () => {
    it('succeeds', () => {
    })
  })

}
