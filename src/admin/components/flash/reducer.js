import * as actionTypes from './action_types'

const INITIAL_STATE = null

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET:
    return {
      style: action.style,
      message: action.message
    }

  case actionTypes.CLEAR:
    return  null

  default:
    return state
  }

}
