import * as actionTypes from './action_types'

export function open(tasks) {
  return {
    type: actionTypes.OPEN,
    tasks
  }
}

export function close() {
  return {
    type: actionTypes.CLOSE
  }
}
