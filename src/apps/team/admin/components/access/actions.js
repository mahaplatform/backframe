import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function toggleApp(index) {
  return {
    type: actionTypes.TOGGLE_APP,
    index
  }
}

export function toggleRight(appIndex, index) {
  return {
    type: actionTypes.TOGGLE_RIGHT,
    appIndex,
    index
  }
}

export function load() {
  return api.get({
    endpoint: '/admin/access',
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
    success: actionTypes.SUBMIT_SUCCESS,
    failure: actionTypes.SUBMIT_FAILURE
  })
}
