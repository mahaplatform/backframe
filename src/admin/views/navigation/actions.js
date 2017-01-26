import * as actionTypes from './action_types'

export const toggleMode = () => {
  return {
    type: actionTypes.TOGGLE_MODE
  }
}

export function forward(index) {
  return {
    type: actionTypes.FORWARD,
    index
  }
}

export function back() {
  return {
    type: actionTypes.BACK
  }
}

export function reset() {
  return {
    type: actionTypes.RESET
  }
}
