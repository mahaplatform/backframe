import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function setToken(token) {
  return {
    type: actionTypes.SET_TOKEN,
    token
  }
}

export function claim(token) {
  return api.get({
    params: { token },
    endpoint: '/admin/reset/claim',
    request: actionTypes.CLAIM_REQUEST,
    success: actionTypes.CLAIM_SUCCESS,
    failure: actionTypes.CLAIM_FAILURE
  })
}

export function verify(token, security_question_index, answer) {
  return api.post({
    params: { token, security_question_index, answer },
    endpoint: '/admin/reset/security',
    request: actionTypes.SECURITY_REQUEST,
    success: actionTypes.SECURITY_SUCCESS,
    failure: actionTypes.SECURITY_FAILURE
  })
}

export function reset(token, password, confirm) {
  return api.post({
    params: { token, password, confirm },
    endpoint: '/admin/reset/password',
    request: actionTypes.PASSWORD_REQUEST,
    success: actionTypes.PASSWORD_SUCCESS,
    failure: actionTypes.PASSWORD_FAILURE
  })
}
