import * as actionTypes from './action_types'

export function set(style) {
  return {
    type: actionTypes.SET,
    style
  }
}
