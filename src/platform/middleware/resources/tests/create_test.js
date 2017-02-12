import { expect } from 'chai'
import create from '../actions/create'
import User from './mock_user'

describe('resource create route', () => {

    describe('processor', () => {

        it('allows params from all', (done) => {

            const options = {
                model: User,
                allowedParams: {
                    all: ['email', 'password_salt', 'password_hash']
                },
                serializer: {
                    all: () => {}
                }
            }

            const { processor } = create(options)

            const req = {
                body: {
                    email: 'greg@thinktopography.com',
                    password_salt: '$2a$11$GOvsCGi0d.1SPNV4ACVLLe',
                    password_hash: '$2a$11$GOvsCGi0d.1SPNV4ACVLLewT6L/A6XjuGL49lVIGRrkU0l9b.2cQe'
                }
            }

            processor(req).then(() => done())

        })

        it('allows params from all and create')

        it('only sets allowed params')

        it('set defaults')

        it('sets user_id if ownedByUser')

    })

    describe('responder', () => {

    })

    describe('logger', () => {

    })




})
