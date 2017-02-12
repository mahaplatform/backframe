import { expect } from 'chai'
import { mapOptionToActions, checkOptions, normalizeOptions } from '../utils/options.js'

describe('resource utils', () => {

  describe('mapOptionToActions', () => {

    it('converts null to empty hash', () => {

      expect(mapOptionToActions(null)).to.eql({})

    })

    it('converts simple value to mapped hash', () => {

      expect(mapOptionToActions('foo')).to.eql({ all: 'foo' })

    })

    it('passes through a mapped hash', () => {

      const mapped = {
        all: 'foo',
        create: 'bar'
      }

      expect(mapOptionToActions(mapped)).to.eql(mapped)

    })

  })

  describe('checkOptions', () => {

    it('requires a name and model', () => {

      expect(checkOptions({})).to.include('attribute "name" is required')
      expect(checkOptions({})).to.include('attribute "model" is required')

    })

  })

  describe('normalizeOptions', () => {

    it('sets defaults', () => {

      const normalized = normalizeOptions({ name: 'user' })

      expect(normalized.defaultSort).to.eql('-created_at')
      expect(normalized.logger).to.eql({})
      expect(normalized.ownedByUser).to.eql(false)
      expect(normalized.processor).to.eql({})
      expect(normalized.responder).to.eql({})
      expect(normalized.softDelete).to.eql(true)

    })

    it('merges userOptions and overrides defaults', () => {

      const userOptions = {
        defaultSort: 'created_at',
        name: 'user',
        ownedByUser: true,
        softDelete: false
      }

      const normalized = normalizeOptions(userOptions)

      expect(normalized.defaultSort).to.eql('created_at')
      expect(normalized.ownedByUser).to.eql(true)
      expect(normalized.softDelete).to.eql(false)

    })

    it('merges normalizes action mapped optins', () => {

      const userOptions = {
        after: 'foo',
        allowedParams: ['foo', 'bar'],
        before: 'foo',
        name: 'user',
        serializer: 'foo'
      }

      const normalized = normalizeOptions(userOptions)

      expect(normalized.after).to.eql({ all: 'foo' })
      expect(normalized.allowedParams).to.eql({ all: ['foo', 'bar'] })
      expect(normalized.before).to.eql({ all: 'foo' })
      expect(normalized.path).to.eql('users')
      expect(normalized.serializer).to.eql({ all: 'foo' })

    })

  })

})
