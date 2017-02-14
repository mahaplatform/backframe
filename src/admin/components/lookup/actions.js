import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function begin() {
  return {
    type: actionTypes.BEGIN
  }
}

export function clear() {
  return {
    type: actionTypes.CLEAR
  }
}

export function cancel() {
  return {
    type: actionTypes.CANCEL
  }
}

export function choose(index) {
  return {
    type: actionTypes.CHOOSE,
    index
  }
}

export function lookup(cid, q, endpoint) {
  return api.get({
    params: { $filter: { q } },
    endpoint,
    meta: { cid },
    request: actionTypes.LOOKUP_REQUEST,
    success: actionTypes.LOOKUP_SUCCESS,
    failure: actionTypes.LOOKUP_FAILURE
  })
}
