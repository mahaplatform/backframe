import * as actionTypes from './action_types'

export const INITIAL_STATE = null

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.OPEN:
    return {
      component: action.component,
      location: action.location
    }

  case actionTypes.CLOSE:
    return null

  default:
    return state
  }

}
