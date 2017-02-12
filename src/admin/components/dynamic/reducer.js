import * as actionTypes from './action_types'

const INITIAL_STATE = {
  status: 'pending',
  records: [],
  loaded: 0,
  total: 0
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return INITIAL_STATE

  case actionTypes.FETCH_REQUEST:
    return {
      ...state,
      status: 'loading'
    }

  case actionTypes.FETCH_SUCCESS:
    return {
      ...state,
      records: action.data,
      status: 'completed'
    }

  default:
    return state
  }

}
