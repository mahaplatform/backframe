import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  active: null,
  app: null,
  mode: 'apps',
  path: [],
  route: null,
  state: 'slide-next'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.CLOSE:
    return {
      ...state,
      active: null,
      route: null
    }

  case actionTypes.TOGGLE_MODE:
    return {
      ...state,
      mode: (state.mode === 'apps') ? 'teams' : 'apps'
    }

  case actionTypes.FORWARD:
    return {
      ...state,
      state: 'slide-next',
      path: [
        ...state.path,
        action.index
      ]
    }

  case actionTypes.BACK:
    return {
      ...state,
      state: 'slide-back',
      path: [
        ...state.path.slice(0, state.path.length - 1)
      ]
    }

  default:
    return state
  }
}
