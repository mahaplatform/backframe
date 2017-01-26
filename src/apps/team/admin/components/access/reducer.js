import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending',
  access: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_SUCCESS:
    return {
      ...state,
      access: action.data.records
    }

  case actionTypes.TOGGLE_APP:
    return {
      ...state,
      access: state.access.map((app, index) => {
        if(index === action.index) {
          return {
            ...app,
            assigned: !app.assigned
          }
        } else {
          return app
        }
      })
    }

  case actionTypes.TOGGLE_RIGHT:
    return {
      ...state,
      access: state.access.map((app, appIndex) => {
        if(appIndex === action.appIndex) {
          return {
            ...state.access[appIndex],
            rights: state.access[appIndex].rights.map((right, index) => {
              if(index === action.index) {
                return {
                  ...right,
                  assigned: !right.assigned
                }
              } else {
                return right
              }
            })
          }
        } else {
          return app
        }
      })
    }

  default:
    return state

  }

}
