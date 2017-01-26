import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function load(key, endpoint, value, text, ids) {
  return api.get({
    endpoint,
    meta: { key, value, text },
    params: { $ids: ids },
    request: actionTypes.LOAD_REQUEST,
    success: actionTypes.LOAD_SUCCESS,
    failure: actionTypes.LOAD_FAILURE
  })
}

export function set(key, value) {
  return {
    type: actionTypes.SET,
    key,
    value
  }
}

export function choose(index) {
  return {
    type: actionTypes.CHOOSE,
    index
  }
}

export function back() {
  return {
    type: actionTypes.BACK
  }
}

export function restart() {
  return {
    type: actionTypes.RESTART
  }
}

export function resetAll() {
  return {
    type: actionTypes.RESET_ALL
  }
}

export function reset(key) {
  return {
    type: actionTypes.RESET,
    key
  }
}

export function update(key, value) {
  return {
    type: actionTypes.UPDATE,
    key,
    value
  }
}

export function remove(key, index) {
  return {
    type: actionTypes.REMOVE,
    key,
    index
  }
}

export function lookup(query) {
  return {
    type: actionTypes.LOOKUP,
    query
  }
}

export function abort() {
  return {
    type: actionTypes.ABORT
  }
}
