import { expect } from 'chai'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

describe('drawer', () => {

  describe('reducer', () => {

    it('it sets the defaults', () => {
      let state = undefined
      let action = {
        type: ''
      }
      let expected = null
      expect(reducer(state, action)).to.be.eql(expected)
    })

  })

})
