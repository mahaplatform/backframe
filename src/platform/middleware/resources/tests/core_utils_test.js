import { expect } from 'chai'
import { coerceArray, mergeParams, flattenKeys, includeAction, applyToRecords, runHooks, wrapWithHooks, filterParams, serializeRecord, resourceRenderer, resourceResponder, buildHandlerComponents, buildRoutes, buildCustomRoutes, buildNestedRoutes } from '../utils'

describe('core utils', () => {

    describe('coerceArray', () => {

        it('transforms an array into an array', () => {

            expect(coerceArray([1,2,3])).to.eql([1,2,3])

        })

        it('transforms an string into an array', () => {

            expect(coerceArray(1)).to.eql([1])

        })

        it('transforms a null into an empty array', () => {

            expect(coerceArray(null)).to.eql([])

        })

    })

    describe('mergeParams', () => {

        it('combines many arrays', () => {

            expect(mergeParams([1,2],[3,4],[5,6])).to.eql([1,2,3,4,5,6])

        })

        it('combines many primitives into a single array', () => {

            expect(mergeParams('one',2,['three','four'])).to.eql(['one',2,'three','four'])

        })

        it('excludes duplicates', () => {

            expect(mergeParams([1,2],[2,3])).to.eql([1,2,3])

        })

    })

    describe('flattenKeys', () => {

        it('maps simple hash', () => {

            expect(flattenKeys({ a: 1, b: 2, c: 3 })).to.eql(['a', 'b', 'c'])

        })

        it('maps complex hash', () => {

            expect(flattenKeys({ a: { b: 2, c: 3 } })).to.eql(['a.b', 'a.c'])

        })

    })

    describe('includeAction', () => {

        it('returns true with no inclusions or exclusions', () => {

            expect(includeAction('list', null, null)).to.be.true

        })

        it('returns true with included action', () => {

            expect(includeAction('list', ['list'], null)).to.be.true

        })

        it('returns false with non included action', () => {

            expect(includeAction('list', ['show'], null)).to.be.false

        })

        it('returns false with excluded action', () => {

            expect(includeAction('list', null, ['list'])).to.be.false

        })

        it('returns true with non excluded action', () => {

            expect(includeAction('list', null, ['show'])).to.be.true

        })

    })

    describe('buildHandler', () => {

    })

    describe('wrapWithHooks', () => {

        const testWrapWithHooks = (options) => {

            const response = options.response || (options.error) ? {
                status: code => {
                    expect(code).to.equal(options.error.code)
                    return {
                        json: err => {
                            expect(err).to.eql({
                                meta: {
                                    success: false,
                                    status: 'APPLICATION ERROR',
                                    message: options.error.message
                                }
                            })
                            options.done()
                        }
                    }
                }
            } : {
                status: code => ({
                    json: err => {}
                })
            }

            wrapWithHooks(options.authenticator, options.authorizer, options.before, options.processor, options.after, options.logger, options.renderer, options.alter, options.responder, {}, response, () => {})

        }

        it('executes authenticator', (done) => {

            const authenticator = req => done()

            testWrapWithHooks({ authenticator })

        })

        it('executes authorizer', (done) => {

            const authorizer = req => done()

            testWrapWithHooks({ authorizer })

        })

        it('responds with error if authorizer fails', (done) => {

            const authorizer = req => new Promise((resolve, reject) => reject('foo'))

            const error = {
                code: 500,
                message: 'foo'
            }

            testWrapWithHooks({ authorizer, error, done })

        })

        it('executes processor', (done) => {

            const processor = req => done()

            testWrapWithHooks({ processor })

        })

        it('executes renderer', (done) => {

            const renderer = (req, result) => done()

            testWrapWithHooks({ renderer })

        })

        it('executes responder', (done) => {

            const responder = (req, res, next, result) => new Promise((resolve, reject) => {
                resolve()
                done()
            })

            testWrapWithHooks({ responder })

        })

        it('executes logger', (done) => {

            const logger = (req, result) => done()

            testWrapWithHooks({ logger })

        })

        it('responds with error if before hook fails', (done) => {

            const before = req => new Promise((resolve, reject) => reject('foo'))

            const error = {
                code: 500,
                message: 'foo'
            }

            testWrapWithHooks({ before, error, done })

        })

        it('responds with error if after hook fails', (done) => {

            const after = req => new Promise((resolve, reject) => reject('foo'))

            const error = {
                code: 500,
                message: 'foo'
            }

            testWrapWithHooks({ after, error, done })

        })

    })

    describe('applyToRecords', () => {

        it('applies operation to records', (done) => {

            const result = {
                foo: 'bar',
                records: [1,2,3]
            }

            const operation = (req, result) => {
                return result * 2
            }

            const expected = {
                foo: 'bar',
                records: [2,4,6]
            }

            applyToRecords({}, result, operation).then(result => {
                expect(result).to.eql(expected)
                done()
            })

        })

    })

    describe('runHooks', () => {

        it('resolves with null hooks', (done) => {

            runHooks({}, null).then(() => done())

        })

        it('resolves with empty hooks', (done) => {

            runHooks({}, []).then(() => done())

        })

        it('resolves with a single resolving hook', (done) => {

            const hooks = (req) => new Promise((resolve, reject) => resolve())

            runHooks({}, hooks).then(() => done())

        })

        it('resolves with multiple resolving hooks', (done) => {

            const hooks = [
                (req) => new Promise((resolve, reject) => resolve()),
                (req) => new Promise((resolve, reject) => resolve())
            ]

            runHooks({}, hooks).then(() => done())

        })

        it('rejects with a at least one rejected hook', (done) => {

            const hooks = [
                (req) => new Promise((resolve, reject) => reject('foo')),
                (req) => new Promise((resolve, reject) => resolve())
            ]

            runHooks({}, hooks).catch(() => done())

        })

    })

    describe('wrapWithTransitions', () => {

    })

    describe('filterParams', () => {

        it('filters out unwanted params', () => {

            expect(filterParams({ foo: 1, bar: 2, baz: 3 }, ['foo','bar'])).to.eql({ foo: 1, bar: 2 })

        })

        it('does not create phantom params', () => {

            expect(filterParams({}, ['foo','bar'])).to.eql({})

        })

        it('merges query and params, giving params precedence', () => {

            expect(filterParams({ a: 1, b: 3, c: 4 }, ['a','b','c'])).to.eql({ a: 1, b: 3, c: 4 })

        })

    })

    describe('serializeRecord', () => {


        it('it calls toJSON method if no serializer or select is passed', (done) => {

            const record = {
                toJSON: () => ({ foo: 1, bar: 2, baz: 3 })
            }

            serializeRecord(record, null).then(serialized => {

                expect(serialized).to.eql({ foo: 1, bar: 2, baz: 3 })
                done()

            })

        })

        it('it uses serializer if serializer is passed', (done) => {

            const record = {}

            const serializer = object => ({ type: 'foo', id: 1, attributes: { foo: 1, bar: 2, baz: 3 } })

            serializeRecord(record, serializer).then(serialized => {

                expect(serialized).to.eql({ type: 'foo', id: 1, attributes: { foo: 1, bar: 2, baz: 3 } })
                done()

            })

        })

    })

    describe('resourceRenderer', () => {

        it('uses the provided serializer to render the resource', (done) => {

            const serializer = (resource) => new Promise((resolve, reject) => resolve(resource))
            const resource = { a: 1, b: 2 }

            resourceRenderer(serializer, {})({}, resource).then(serialized => {
                expect(serialized).to.eql(resource)
                done()
            })

        })

    })

    describe('resourceResponder', () => {

        it('responds with a success', (done) => {

            const expected = {
                meta: {
                    success: true,
                    status: 'OK',
                    message: 'yay'
                },
                data: null
            }

            const res = {
                status: code => ({
                    json: json => {
                        expect(json).to.be.eql(expected)
                        done()
                    }
                })
            }

            resourceResponder(200, 'yay')({}, res, () => {}, null)

        })

    })

    describe('resourceLogger', () => {
    })

    describe('buildHandlerComponents', () => {

        it('passes through defaults without overrides', () => {

            const options = {
                authorizer: {},
                processor: {},
                renderer: {},
                responder: {},
                logger: {}
            }

            const authorizer = 'foo'
            const processor = 'foo'
            const renderer = 'foo'
            const responder = 'foo'
            const logger = 'foo'

            const result = buildHandlerComponents(options, 'create', authorizer, processor, renderer, responder, logger)

            expect(result.authorizer).to.eql(authorizer)
            expect(result.processor).to.eql(processor)
            expect(result.renderer).to.eql(renderer)
            expect(result.responder).to.eql(responder)
            expect(result.logger).to.eql(logger)

        })

        it('overrides defaults', () => {

            const options = {
                authorizer: {
                    create: 'bar'
                },
                processor: {
                    create: 'bar'
                },
                renderer: {
                    create: 'bar'
                },
                responder: {
                    create: 'bar'
                },
                logger: {
                    create: 'bar'
                }
            }

            const authorizer = 'foo'
            const processor = 'foo'
            const renderer = 'foo'
            const responder = 'foo'
            const logger = 'foo'

            const result = buildHandlerComponents(options, 'create', authorizer, processor, renderer, responder, logger)

            expect(result.processor).to.eql(options.processor.create)
            expect(result.processor).to.eql(options.processor.create)
            expect(result.responder).to.eql(options.responder.create)
            expect(result.renderer).to.eql(options.responder.create)
            expect(result.logger).to.eql(options.logger.create)

        })

    })

    describe('buildRoutes', () => {

        it('sets paths and methods correctly', () => {

            const options = {
                name: 'user',
                model: 'user',
                path: 'users'
            }

            const routes = buildRoutes(options)

            expect(routes.user_list.path).to.eql('/users(\.:ext)?')
            expect(routes.user_list.method).to.eql('get')
            expect(routes.user_create.path).to.eql('/users')
            expect(routes.user_create.method).to.eql('post')
            expect(routes.user_show.path).to.eql('/users/:id')
            expect(routes.user_show.method).to.eql('get')
            expect(routes.user_update.path).to.eql('/users/:id')
            expect(routes.user_update.method).to.eql('patch')
            expect(routes.user_destroy.path).to.eql('/users/:id')
            expect(routes.user_destroy.method).to.eql('delete')

        })

        it('creates only actions identified in only', () => {

            const options = {
                name: 'user',
                model: 'user',
                path: 'users',
                only: 'show'
            }

            const routes = buildRoutes(options)

            expect(routes).to.not.include.keys('user_list')
            expect(routes).to.not.include.keys('user_create')
            expect(routes).to.include.keys('user_show')
            expect(routes).to.not.include.keys('user_update')
            expect(routes).to.not.include.keys('user_destroy')

        })

        it('creates all actions except those identified in except', () => {

            const options = {
                name: 'user',
                model: 'user',
                path: 'users',
                except: 'show'
            }

            const routes = buildRoutes(options)

            expect(routes).to.include.keys('user_list')
            expect(routes).to.include.keys('user_create')
            expect(routes).to.not.include.keys('user_show')
            expect(routes).to.include.keys('user_update')
            expect(routes).to.include.keys('user_destroy')

        })

    })

    describe('buildCustomRoutes', () => {

        it('creates a custom route with appropriate name and path', () => {

            const options = {
                name: 'user',
                path: 'users',
                actions: {
                    activate: {
                        method: 'get',
                        path: 'activate',
                        builder: req => ({
                            responder: (req, res, next, result) => {
                                res.send(result)
                            }
                        })
                    }
                }
            }

            const routes = buildCustomRoutes(options, 'admin_user_', '/admin')

            expect(routes).to.include.keys('admin_user_activate')
            expect(routes.admin_user_activate.method).to.equal('get')
            expect(routes.admin_user_activate.path).to.equal('/admin/users/:id/activate')
            expect(routes.admin_user_activate.builder).to.not.be.null

        })

    })

    describe('buildNestedRoutes', () => {

        it('builds single level nested routes', () => {
            const options = {
                name: 'user',
                path: 'users',
                model: 'user',
                resources: [
                    {
                        name: 'address',
                        model: 'address'
                    }
                ]
            }

            const nestedRoutes = buildNestedRoutes(options, 'user_', '')

            expect(nestedRoutes).to.include.keys('user_address_list')
            expect(nestedRoutes).to.include.keys('user_address_create')
            expect(nestedRoutes).to.include.keys('user_address_show')
            expect(nestedRoutes).to.include.keys('user_address_update')
            expect(nestedRoutes).to.include.keys('user_address_destroy')

        })

        it('builds multiple level nested routes')

    })

})
