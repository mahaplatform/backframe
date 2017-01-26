import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  style: null,
  notifications: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET:
    return {
      style: action.style
    }

  case actionTypes.PUSH_NOTIFICATION:
    return {
      ...state,
      notifications: [
        ...state.notifications,
        {
          title: action.title,
          body: action.body,
          icon: action.icon
        }
      ]
    }

  case actionTypes.CLEAR_NOTIFICATION:
    return {
      ...state,
      notifications: [
        ...state.notifications.slice(0, action.index),
        ...state.notifications.slice(action.index + 1)
      ]
    }

  default:
    return state
  }
}
