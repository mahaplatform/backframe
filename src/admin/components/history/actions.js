import * as actionTypes from './action_types'

export function push(pathname) {
  return {
    type: actionTypes.PUSH,
    pathname
  }
}

export function goBack() {
  return {
    type: actionTypes.GO_BACK
  }
}

export function reset(pathname) {
  return {
    type: actionTypes.RESET,
    pathname
  }
}
