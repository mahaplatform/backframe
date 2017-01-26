import * as actionTypes from './action_types'

const INITIAL_STATE = {
  active: 0,
  state: 'next'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.CHANGE_TAB:
    return {
      active: action.index,
      state: action.index > state.active ? 'next' : 'back'
    }

  default:
    return state

  }

}
