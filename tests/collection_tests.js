import { expect } from 'chai'
import Collection from '../src/collection'

describe('collection', () => {

  it('should include all actions by default', () => {

    const collection = new Collection()

    expect(collection._includeAction('list')).to.be.eql(true)
    expect(collection._includeAction('create')).to.be.eql(true)
    expect(collection._includeAction('show')).to.be.eql(true)
    expect(collection._includeAction('update')).to.be.eql(true)
    expect(collection._includeAction('destroy')).to.be.eql(true)

  })

  it('should include only actions in only option', () => {

    const collection = new Collection({
      only: ['list','show']
    })

    expect(collection._includeAction('list')).to.be.eql(true)
    expect(collection._includeAction('create')).to.be.eql(false)
    expect(collection._includeAction('show')).to.be.eql(true)
    expect(collection._includeAction('update')).to.be.eql(false)
    expect(collection._includeAction('destroy')).to.be.eql(false)

  })

  it('should omit all actions in except option', () => {

    const collection = new Collection({
      except: ['create','update','destroy']
    })

    expect(collection._includeAction('list')).to.be.eql(true)
    expect(collection._includeAction('create')).to.be.eql(false)
    expect(collection._includeAction('show')).to.be.eql(true)
    expect(collection._includeAction('update')).to.be.eql(false)
    expect(collection._includeAction('destroy')).to.be.eql(false)

  })

  it('should destructure multiple flat options', () => {

    const collection = new Collection()

    const options = {
      foo: 'foo',
      bar: 'bar'
    }

    expect(collection._getDestructuredOptions(options, 'list')).to.be.eql(options)

  })

  it('should destructure multiple nested options', () => {

    const collection = new Collection()

    const options = {
      foo: {
        list: 'foo',
        all: 'all'
      },
      bar: 'bar'
    }

    expect(collection._getDestructuredOptions(options, 'list')).to.be.eql({
      foo: 'foo',
      bar: 'bar'
    })


  })

  it('should omit null options', () => {

    const collection = new Collection()

    const options = {
      foo: {
        list: 'foo'
      }
    }

    expect(collection._getDestructuredOptions(options, 'list')).to.be.eql({
      foo: 'foo'
    })

    expect(collection._getDestructuredOptions(options, 'show')).to.be.eql({})

  })

  it('should destructure flat option', () => {

    const collection = new Collection()

    const options = {
      foo: 'bar'
    }

    expect(collection._getDestructuredOption(options, 'foo', 'list')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'create')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'show')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'update')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql('bar')

  })

  it('should destructure all option', () => {

    const collection = new Collection()

    const options = {
      foo: {
        all: 'bar'
      }
    }

    expect(collection._getDestructuredOption(options, 'foo', 'list')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'create')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'show')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'update')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql('bar')

  })

  it('should destructure custom and all option', () => {

    const collection = new Collection()

    const options = {
      foo: {
        list: 'baz',
        all: 'bar'
      }
    }

    expect(collection._getDestructuredOption(options, 'foo', 'list')).to.be.eql('baz')
    expect(collection._getDestructuredOption(options, 'foo', 'create')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'show')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'update')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql('bar')

  })

  it('should destructure missing option to null', () => {

    const collection = new Collection()

    const options = {
      foo: {
        list: 'bar'
      }
    }

    expect(collection._getDestructuredOption(options, 'foo', 'list')).to.be.eql('bar')
    expect(collection._getDestructuredOption(options, 'foo', 'create')).to.be.eql(null)
    expect(collection._getDestructuredOption(options, 'foo', 'show')).to.be.eql(null)
    expect(collection._getDestructuredOption(options, 'foo', 'update')).to.be.eql(null)
    expect(collection._getDestructuredOption(options, 'foo', 'destroy')).to.be.eql(null)

  })

})
