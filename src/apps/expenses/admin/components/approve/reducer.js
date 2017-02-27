import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.APPROVE_SUCCESS:
    return {
      ...state,
      status: 'approved'
    }

  case actionTypes.REJECT_SUCCESS:
    return {
      ...state,
      status: 'rejected'
    }

  default:
    return state

  }

}
