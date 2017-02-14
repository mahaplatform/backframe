import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function load() {
  return api.get({
    endpoint: '/admin/project/unassigned',
    request: actionTypes.LOAD_REQUEST,
    success: actionTypes.LOAD_SUCCESS,
    failure: actionTypes.LOAD_FAILURE
  })
}

export function submit(endpoint, params) {
  return api.get({
    endpoint,
    params,
    request: actionTypes.SUBMIT_REQUEST,
    success: actionTypes.SUBMIT_SUBMIT,
    failure: actionTypes.SUBMIT_FAILURE
  })
}
