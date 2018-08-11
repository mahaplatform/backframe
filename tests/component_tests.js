import { expect } from 'chai'
import Component from '../src/component'

describe('component', () => {

  it('should be instantiated by an object', () => {

    const component = new Component({
      alterRequest: (req, trx, options) => req,
      beforeProcessor: (req, trx, options) => {},
      afterProcessor: (req, trx, result, options) => result,
      alterRecord: (req, trx, record, options) => record,
      beforeCommit: (req, trx, result, options) => {},
      afterCommit: (req, trx, result, options) => {},
      beforeRollback: (req, trx, options) => {},
      path: '/foo/bar'
    })

    expect(component.hooks.alterRequest.length).to.be.eql(1)
    expect(component.hooks.beforeProcessor.length).to.be.eql(1)
    expect(component.hooks.afterProcessor.length).to.be.eql(1)
    expect(component.hooks.alterRecord.length).to.be.eql(1)
    expect(component.hooks.beforeCommit.length).to.be.eql(1)
    expect(component.hooks.afterCommit.length).to.be.eql(1)
    expect(component.hooks.beforeRollback.length).to.be.eql(1)
    expect(component.path).to.be.eql('/foo/bar')

  })

  it('adds a single hook', () => {

    const component = new Component()

    component.addHook('alterRequest', (req) => req)

    expect(component.hooks.alterRequest.length).to.be.eql(1)

  })

  it('add multiple hooks', () => {

    const component = new Component()

    component.addHook('alterRequest', [
      (req) => req,
      (req) => req
    ])

    expect(component.hooks.alterRequest.length).to.be.eql(2)

  })

  it('sets the path', () => {

    const component = new Component()

    component.setPath('/foo/bar')

    expect(component.path).to.be.eql('/foo/bar')

  })

  it('extracts customOptions', () => {

    const component = new Component({
      custom1: 'custom1',
      custom2: 'custom2'
    })

    expect(component.customOptions).to.be.eql({
      custom1: 'custom1',
      custom2: 'custom2'
    })

  })

})
