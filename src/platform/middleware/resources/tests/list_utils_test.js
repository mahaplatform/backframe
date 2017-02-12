import { expect } from 'chai'
import { extractSort, filter, selectFields } from '../utils/list'

describe('list_utils', () => {

    describe('extractSort', () => {

        it('handles simple ascending from query', () => {

            const query = 'created_at'

            const expected = [
                {
                    key: 'created_at',
                    order: 'asc'
                }
            ]

            expect(extractSort(query, null, ['created_at'])).to.eql(expected)

        })

        it('handles simple descending from query', () => {

            const query = '-created_at'

            const expected = [
                {
                    key: 'created_at',
                    order: 'desc'
                }
            ]

            expect(extractSort(query, null, ['created_at'])).to.eql(expected)

        })

        it('handles compound acending, descending from query', () => {

            const query = [
                'created_at',
                '-id'
            ]

            const expected = [
                {
                    key: 'created_at',
                    order: 'asc'
                }, {
                    key: 'id',
                    order: 'desc'
                }
            ]

            expect(extractSort(query, null, ['created_at','id'])).to.eql(expected)

        })

        it('handles value from options', () => {

            const defaults = 'created_at'

            const expected = [
                {
                    key: 'created_at',
                    order: 'asc'
                }
            ]

            expect(extractSort(null, defaults, ['created_at'])).to.eql(expected)

        })

        it('give precedence to value from query', () => {

            const query = 'created_at'

            const defaults = 'id'

            const expected = [
                {
                    key: 'created_at',
                    order: 'asc'
                }
            ]

            expect(extractSort(query, defaults, ['created_at'])).to.eql(expected)

        })

        it('returns null if neither query or options define sort', () => {

            expect(extractSort(null, null, [])).to.be.null

        })

        it('removes non sort params from sort', () => {

            const query = [
                'title',
                'created_at'
            ]

            const expected = [
                {
                    key: 'created_at',
                    order: 'asc'
                }
            ]

            expect(extractSort(query, null, ['id','created_at'])).to.eql(expected)

        })

    })

    describe('filter', () => {

        it('doesnt filter if no filters included', () => {

            expect(filter({}, {})).to.eql({})

        })

        it('applies $eq filter', (done) => {

            const qb = {
                where: (key, value) => {
                    expect(key).to.equal('foo')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $eq: 'bar' }})

        })

        it('applies $ne filter', (done) => {

            const qb = {
                whereNot: (key, value) => {
                    expect(key).to.equal('foo')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $ne: 'bar' }})

        })

        it('applies $in filter', (done) => {

            const qb = {
                whereIn: (key, value) => {
                    expect(key).to.equal('foo')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $in: 'bar' }})

        })

        it('applies $nin filter', (done) => {

            const qb = {
                whereNotIn: (key, value) => {
                    expect(key).to.equal('foo')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $nin: 'bar' }})

        })

        it('applies $lt filter', (done) => {

            const qb = {
                where: (key, operation, value) => {
                    expect(key).to.equal('foo')
                    expect(operation).to.equal('<')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $lt: 'bar' }})

        })

        it('applies $lte filter', (done) => {

            const qb = {
                where: (key, operation, value) => {
                    expect(key).to.equal('foo')
                    expect(operation).to.equal('<=')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $lte: 'bar' }})

        })

        it('applies $gt filter', (done) => {

            const qb = {
                where: (key, operation, value) => {
                    expect(key).to.equal('foo')
                    expect(operation).to.equal('>')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $gt: 'bar' }})

        })

        it('applies $gte filter', (done) => {

            const qb = {
                where: (key, operation, value) => {
                    expect(key).to.equal('foo')
                    expect(operation).to.equal('>=')
                    expect(value).to.equal('bar')
                    done()
                }
            }

            filter(qb, { foo: { $gte: 'bar' }})

        })

    })

    describe('selectFields', () => {

        it('it filters values based on select, including id', (done) => {

            const serialized = { type: 'foo', id: 1, attributes: { foo: 1, bar: 2, baz: 3 } }

            const select = ['foo']

            selectFields(select)({}, serialized).then(serialized => {

                expect(serialized).to.eql({ type: 'foo', id: 1, attributes: { foo: 1 } })
                done()

            })

        })

    })



})
