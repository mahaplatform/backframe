import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  error: null,
  mode: 'team',
  show: false,
  status: 'pending',
  team: null,
  user: null,
  token: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TEAM_REQUEST:
  case actionTypes.EMAIL_REQUEST:
  case actionTypes.PASSWORD_REQUEST:
  case actionTypes.FORGOT_REQUEST:
    return {
      ...state,
      error: null,
      status: 'submitting'
    }

  case actionTypes.TEAM_FAILURE:
  case actionTypes.EMAIL_FAILURE:
  case actionTypes.PASSWORD_FAILURE:
  case actionTypes.FORGOT_FAILURE:
    return {
      ...state,
      status: 'failure',
      error: action.meta.message
    }

  case actionTypes.TEAM_SUCCESS:
    return {
      ...state,
      team: action.data,
      status: 'success',
      mode: 'email'
    }

  case actionTypes.EMAIL_SUCCESS:
    return {
      ...state,
      user: action.data,
      status: 'success',
      mode: 'password'
    }

  case actionTypes.PASSWORD_SUCCESS:
    return {
      ...state,
      token: action.data.token,
      status: 'success'
    }

  case actionTypes.FORGOT_SUCCESS:
    return {
      ...state,
      status: 'success'
    }

  case actionTypes.CHANGE_USER:
    return {
      ...state,
      user: null
    }

  case actionTypes.TOGGLE_PASSWORD:
    return {
      ...state,
      show: !state.show
    }

  case actionTypes.RESET:
    return INITIAL_STATE

  default:
    return state
  }

}
