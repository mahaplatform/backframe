import * as actionTypes from './action_types'

export const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.PUSH:
    return [
      ...state,
      {
        title: action.title,
        body: action.body
      }
    ]

  case actionTypes.CLEAR:
    return [
      ...state.slice(0, action.index),
      ...state.slice(action.index + 1)
    ]

  default:
    return state
  }
}
