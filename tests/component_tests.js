import { expect } from 'chai'
import Component from '../src/component'

describe('component', () => {

  it('should be instantiated by an object', () => {

    const component = new Component({
      alterRequest: (req) => req,
      beforeProcessor: (req) => {},
      afterProcessor: (req, result) => result,
      alterRecord: (req, record) => record,
      beforeCommit: (req, result) => {},
      afterCommit: (req, result) => {},
      beforeRollback: (req, result) => {},
      path: '/foo/bar'
    })

    expect(component.alterRequest.length).to.be.eql(1)
    expect(component.beforeProcessor.length).to.be.eql(1)
    expect(component.afterProcessor.length).to.be.eql(1)
    expect(component.alterRecord.length).to.be.eql(1)
    expect(component.beforeCommit.length).to.be.eql(1)
    expect(component.afterCommit.length).to.be.eql(1)
    expect(component.beforeRollback.length).to.be.eql(1)
    expect(component.path).to.be.eql('/foo/bar')

  })

  it('appends a single hook', () => {

    const component = new Component()

    expect(component.alterRequest.length).to.be.eql(0)

    component.appendAlterRequest((req) => req)

    expect(component.alterRequest.length).to.be.eql(1)

  })

  it('appends multiple hooks', () => {

    const component = new Component()

    expect(component.alterRequest.length).to.be.eql(0)

    component.appendAlterRequest([
      (req) => req,
      (req) => req
    ])

    expect(component.alterRequest.length).to.be.eql(2)

  })

  it('prepends a single hook', () => {

    const component = new Component()

    expect(component.alterRequest.length).to.be.eql(0)

    component.prependAlterRequest((req) => req)

    expect(component.alterRequest.length).to.be.eql(1)

  })

  it('prepends multiple hooks', () => {

    const component = new Component()

    expect(component.alterRequest.length).to.be.eql(0)

    component.prependAlterRequest([
      (req) => req,
      (req) => req
    ])

    expect(component.alterRequest.length).to.be.eql(2)

  })

  it('sets the path', () => {

    const component = new Component()

    component.setPath('/foo/bar')

    expect(component.path).to.be.eql('/foo/bar')

  })

  it('prepends an existing path', () => {

    const component = new Component({
      path: '/bar'
    })

    component.prependPath('/foo')

    expect(component.path).to.be.eql('/foo/bar')

  })

  it('prepends a null path', () => {

    const component = new Component()

    component.prependPath('/foo')

    expect(component.path).to.be.eql('/foo')

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
