import * as actionTypes from './action_types'

export function hideStatusBar(component, location) {
  return {
    type: actionTypes.HIDE_STATUS_BAR
  }
}

export function showStatusBar() {
  return {
    type: actionTypes.SHOW_STATUS_BAR
  }
}
