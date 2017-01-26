import * as actionTypes from './action_types'

export function set(style, message) {
  return {
    type: actionTypes.SET,
    style,
    message
  }
}

export function clear() {
  return {
    type: actionTypes.CLEAR
  }
}
