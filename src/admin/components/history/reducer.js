import * as actionTypes from './action_types'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.PUSH:
    return [
      ...state,
      action.pathname
    ]

  case actionTypes.GO_BACK:
    return state.slice(0, state.length - 1)


  case actionTypes.RESET:
    return INITIAL_STATE

  default:
    return state
  }

}
