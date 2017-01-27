import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function setAssigned(assigned) {
  return {
    type: actionTypes.SET_ASSIGNED,
    assigned
  }
}

export function toggle(index) {
  return {
    type: actionTypes.TOGGLE,
    index
  }
}

export function load() {
  return api.get({
    endpoint: '/admin/team/roles',
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
