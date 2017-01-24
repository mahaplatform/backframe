import { expect } from 'chai'
import { coerceArray, includeAction, extractFilters, extractSort } from '../utils.js'

describe('resource utils', () => {

  describe('coerceArray', () => {

    it('transforms an array into an array', () => {

      expect(coerceArray([1,2,3])).to.eql([1,2,3])

    })

    it('transforms an string into an array', () => {


      expect(coerceArray(1)).to.eql([1])

    })

  })

  describe('includeAction', () => {

    it('returns true with included action', () => {

      expect(includeAction('list', { include: ['list'] })).to.be.true

    })

    it('returns false with non included action', () => {

      expect(includeAction('list', { include: ['show'] })).to.be.false

    })

    it('returns false with excluded action', () => {

      expect(includeAction('list', { exclude: ['list'] })).to.be.false

    })

    it('returns true with non excluded action', () => {

      expect(includeAction('list', { exclude: ['show'] })).to.be.true

    })

  })

  describe('wrapWithHooks', () => {
  })

  describe('extractFilters', () => {

    it('merges query and params, giving params precedence', () => {

      const query = {
        a: 1,
        b: 2
      }

      const params = {
        b: 3,
        c: 4
      }

      const expected = {
        a: 1,
        b: 3,
        c: 4
      }

      expect(extractFilters(query, params)).to.eql(expected)

    })

    it('removes reserved fields from filters', () => {

      const query = {
        $sort: 1,
        $limit: 2,
        $skip: 3,
        $ids: 4,
        $exclude_ids: 5,
        $select: 6
      }

      const params = {}

      const expected = {}

      expect(extractFilters(query, params)).to.eql(expected)

    })

  })

  describe('extractSort', () => {

    it('handles simple ascending from query', () => {

      const query = {
        $sort: 'created_at'
      }

      const expected = [
        {
          key: 'created_at',
          order: 'asc'
        }
      ]

      expect(extractSort(query, {})).to.eql(expected)

    })

    it('handles simple descending from query', () => {

      const query = {
        $sort: '-created_at'
      }

      const expected = [
        {
          key: 'created_at',
          order: 'desc'
        }
      ]

      expect(extractSort(query, {})).to.eql(expected)

    })

    it('handles compound acending, descending from query', () => {

      const query = {
        $sort: [
          'created_at',
          '-id'
        ]
      }

      const expected = [
        {
          key: 'created_at',
          order: 'asc'
        }, {
          key: 'id',
          order: 'desc'
        }
      ]

      expect(extractSort(query, {})).to.eql(expected)

    })

    it('handles value from options', () => {

      const options = {
        $sort: 'created_at'
      }

      const expected = [
        {
          key: 'created_at',
          order: 'asc'
        }
      ]

      expect(extractSort({}, options)).to.eql(expected)

    })

    it('give precedence to value from query', () => {

      const query = {
        $sort: 'created_at'
      }

      const options = {
        $sort: 'id'
      }

      const expected = [
        {
          key: 'created_at',
          order: 'asc'
        }
      ]

      expect(extractSort(query, options)).to.eql(expected)

    })

    it('returns null if neither query or options define sort', () => {

      expect(extractSort({}, {})).to.be.null

    })

  })

  describe('filter', () => {
  })

  describe('serializeRecord', () => {
  })


})
