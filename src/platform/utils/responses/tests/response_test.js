import { expect } from 'chai'
import { fail, succeed } from 'platform/utils/responses'

describe('responses util', () => {

    it('fails', done => {

        const data = {
            name: ['The name is required']
        }

        const expected = {
            meta: {
                success: false,
                status: 'UNPROCESSABLE ENTRY',
                message: 'There were problems with your data'
            },
            data: {
                name: ['The name is required']
            }
        }

        const res = {
            status: code => {
                expect(code).to.eql(422)
                return {
                    json: response => {
                        expect(response).to.eql(expected)
                        done()
                    }
                }
            }
        }

        fail(res, 422, 'There were problems with your data', data)

    })

    it('succeeds', done => {

        const data = {
            name: 'Greg Kops'
        }

        const expected = {
            meta: {
                success: true,
                status: 'CREATED',
                message: 'The user was created'
            },
            data: {
                name: 'Greg Kops'
            }
        }

        const res = {
            status: code => {
                expect(code).to.eql(201)
                return {
                    json: response => {
                        expect(response).to.eql(expected)
                        done()
                    }
                }
            }
        }

        succeed(res, 201, 'The user was created', data)

    })

})
