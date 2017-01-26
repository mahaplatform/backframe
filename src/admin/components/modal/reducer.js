import * as actionTypes from './action_types'

export const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.PUSH:
    return [
      ...state,
      action.component
    ]

  case actionTypes.POP:
    return state.slice(0, state.length - 1)

  case actionTypes.CLOSE:
    return []

  default:
    return state
  }

}
