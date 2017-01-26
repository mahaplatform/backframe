import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status_bar: true
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.HIDE_STATUS_BAR:
    return {
      ...state,
      status_bar: false
    }

  case actionTypes.SHOW_STATUS_BAR:
    return {
      ...state,
      status_bar: true
    }

  default:
    return state
  }

}
