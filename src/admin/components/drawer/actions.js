import * as actionTypes from './action_types'

export function open(component, location) {
  return {
    type: actionTypes.OPEN,
    component,
    location
  }
}

export function close() {
  return {
    type: actionTypes.CLOSE
  }
}
