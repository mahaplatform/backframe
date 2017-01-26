import * as actionTypes from './action_types'

export function push(component) {
  return {
    type: actionTypes.PUSH,
    component
  }
}

export function pop() {
  return {
    type: actionTypes.POP
  }
}

export function close() {
  return {
    type: actionTypes.CLOSE
  }
}
