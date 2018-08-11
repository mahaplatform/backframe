import { expect } from 'chai'
import Backframe from '../src/backframe'

describe('backframe', () => {

  const defaultFormat = 'json'
  const defaultLimit = 50
  const knex = 'foo'
  const logger = 'bar'
  const path = '/foobar'
  const plugins = ['a', 'b']
  const routes = ['a', 'b']

  it('should be instantiated by an object', () => {

    const backframe = new Backframe({
      defaultFormat,
      defaultLimit,
      knex,
      logger,
      path,
      plugins,
      routes
    })

    expect(backframe.defaultFormat).to.be.eql(defaultFormat)
    expect(backframe.defaultLimit).to.be.eql(defaultLimit)
    expect(backframe.knex).to.be.eql(knex)
    expect(backframe.logger).to.be.eql(logger)
    expect(backframe.path).to.be.eql(path)
    expect(backframe.plugins).to.be.eql(plugins)
    expect(backframe.routes).to.be.eql(routes)

  })

  it('should set defaultFormat', () => {

    const backframe = new Backframe()

    backframe.setDefaultFormat(defaultFormat)

    expect(backframe.defaultFormat).to.be.eql(defaultFormat)

  })

  it('should set defaultLimit', () => {

    const backframe = new Backframe()

    backframe.setDefaultLimit(defaultLimit)

    expect(backframe.defaultLimit).to.be.eql(defaultLimit)

  })

  it('should set knex', () => {

    const backframe = new Backframe()

    backframe.setKnex(knex)

    expect(backframe.knex).to.be.eql(knex)

  })

  it('should set logger', () => {

    const backframe = new Backframe()

    backframe.setLogger(logger)

    expect(backframe.logger).to.be.eql(logger)

  })

  it('should set path', () => {

    const backframe = new Backframe()

    backframe.setPath(path)

    expect(backframe.path).to.be.eql(path)

  })

  it('should set plugins', () => {

    const backframe = new Backframe()

    backframe.setPlugins(plugins)

    expect(backframe.plugins).to.be.eql(plugins)

  })

  it('should add plugins', () => {

    const a = 1
    const b = 2

    const backframe = new Backframe({
      plugins: [a]
    })

    backframe.addPlugin(b)

    expect(backframe.plugins.length).to.be.eql(2)
    expect(backframe.plugins[0]).to.be.eql(a)
    expect(backframe.plugins[1]).to.be.eql(b)

  })

  it('should set routes', () => {

    const backframe = new Backframe()

    backframe.setRoutes(routes)

    expect(backframe.routes).to.be.eql(routes)

  })

  it('should add routes', () => {

    const a = 1
    const b = 2

    const backframe = new Backframe({
      routes: [a]
    })

    backframe.addRoute(b)

    expect(backframe.routes.length).to.be.eql(2)
    expect(backframe.routes[0]).to.be.eql(a)
    expect(backframe.routes[1]).to.be.eql(b)

  })

})
