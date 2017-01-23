import { expect } from 'chai'
import allowedParams from 'app/utils/allowed_params'

describe('allowed_params util', () => {

  it('includes permitted and excludes unpermitted params', () => {

    const body = {
      one: 1,
      two: 2,
      three: 3
    }

    const allowed = [ 'one', 'two' ]

    const expected = {
      one: 1,
      two: 2
    }

    expect(allowedParams(body, allowed)).to.eql(expected)

  })

})
