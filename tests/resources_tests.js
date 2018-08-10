import { expect } from 'chai'
import Resources from '../src/resources'

describe('resources', () => {

  it('should include all actions by default', () => {

    const resources = new Resources()

    expect(resources._includeAction('list')).to.be.eql(true)
    expect(resources._includeAction('create')).to.be.eql(true)
    expect(resources._includeAction('show')).to.be.eql(true)
    expect(resources._includeAction('update')).to.be.eql(true)
    expect(resources._includeAction('destroy')).to.be.eql(true)

  })

  it('should include only actions in only option', () => {

    const resources = new Resources({
      only: ['list','show']
    })

    expect(resources._includeAction('list')).to.be.eql(true)
    expect(resources._includeAction('create')).to.be.eql(false)
    expect(resources._includeAction('show')).to.be.eql(true)
    expect(resources._includeAction('update')).to.be.eql(false)
    expect(resources._includeAction('destroy')).to.be.eql(false)

  })

  it('should omit all actions in except option', () => {

    const resources = new Resources({
      except: ['create','update','destroy']
    })

    expect(resources._includeAction('list')).to.be.eql(true)
    expect(resources._includeAction('create')).to.be.eql(false)
    expect(resources._includeAction('show')).to.be.eql(true)
    expect(resources._includeAction('update')).to.be.eql(false)
    expect(resources._includeAction('destroy')).to.be.eql(false)

  })

  it('should destructure multiple flat options', () => {

    const resources = new Resources()

    const options = {
      foo: 'foo',
      bar: 'bar'
    }

    expect(resources._getDestructuredOptions(options, 'list')).to.be.eql(options)

  })

  it('should destructure multiple nested options', () => {

    const resources = new Resources()

    const options = {
      foo: {
        list: 'foo',
        all: 'all'
      },
      bar: 'bar'
    }

    expect(resources._getDestructuredOptions(options, 'list')).to.be.eql({
      foo: 'foo',
      bar: 'bar'
    })


  })

  it('should omit null options', () => {

    const resources = new Resources()

    const options = {
      foo: {
        list: 'foo'
      }
    }

    expect(resources._getDestructuredOptions(options, 'list')).to.be.eql({
      foo: 'foo'
    })

    expect(resources._getDestructuredOptions(options, 'show')).to.be.eql({})

  })

  it('should destructure flat option', () => {

    const resources = new Resources()

    const options = {
      foo: 'bar'
    }

    expect(resources._getDestructuredOption(options, 'foo', 'list')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'create')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'show')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'update')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql('bar')

  })

  it('should destructure all option', () => {

    const resources = new Resources()

    const options = {
      foo: {
        all: 'bar'
      }
    }

    expect(resources._getDestructuredOption(options, 'foo', 'list')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'create')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'show')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'update')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql('bar')

  })

  it('should destructure custom and all option', () => {

    const resources = new Resources()

    const options = {
      foo: {
        list: 'baz',
        all: 'bar'
      }
    }

    expect(resources._getDestructuredOption(options, 'foo', 'list')).to.be.eql('baz')
    expect(resources._getDestructuredOption(options, 'foo', 'create')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'show')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'update')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql('bar')

  })

  it('should destructure missing option to null', () => {

    const resources = new Resources()

    const options = {
      foo: {
        list: 'bar'
      }
    }

    expect(resources._getDestructuredOption(options, 'foo', 'list')).to.be.eql('bar')
    expect(resources._getDestructuredOption(options, 'foo', 'create')).to.be.eql(null)
    expect(resources._getDestructuredOption(options, 'foo', 'show')).to.be.eql(null)
    expect(resources._getDestructuredOption(options, 'foo', 'update')).to.be.eql(null)
    expect(resources._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql(null)

  })

})
