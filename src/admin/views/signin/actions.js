import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export const team = (subdomain) => {
  return api.get({
    params: { subdomain },
    endpoint: '/admin/auth/teams',
    request: actionTypes.TEAM_REQUEST,
    success: actionTypes.TEAM_SUCCESS,
    failure: actionTypes.TEAM_FAILURE
  })
}

export const email = (team_id, email) => {
  return api.get({
    params: { team_id, email },
    endpoint: '/admin/auth/email',
    request: actionTypes.EMAIL_REQUEST,
    success: actionTypes.EMAIL_SUCCESS,
    failure: actionTypes.EMAIL_FAILURE
  })
}

export const togglePassword = () => {
  return {
    type: actionTypes.TOGGLE_PASSWORD
  }
}

export const password = (team_id, email, password) => {
  return api.post({
    params: { team_id, email, password },
    endpoint: '/admin/auth/password',
    request: actionTypes.PASSWORD_REQUEST,
    success: actionTypes.PASSWORD_SUCCESS,
    failure: actionTypes.PASSWORD_FAILURE
  })
}

export const forgot = (team_id, email) => {
  return api.post({
    params: { team_id, email },
    endpoint: '/admin/auth/forgot',
    request: actionTypes.FORGOT_REQUEST,
    success: actionTypes.FORGOT_SUCCESS,
    failure: actionTypes.FORGOT_FAILURE
  })
}

export const reset = () => {
  return {
    type: actionTypes.RESET
  }
}
