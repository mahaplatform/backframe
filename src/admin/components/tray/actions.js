import * as actionTypes from './action_types'

export function open(component) {
  return {
    type: actionTypes.OPEN,
    component
  }
}

export function close() {
  return {
    type: actionTypes.CLOSE
  }
}
