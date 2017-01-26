import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending',
  roles: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_SUCCESS:
    return {
      ...state,
      roles: action.data.data
    }

  case actionTypes.TOGGLE:
    return {
      ...state,
      roles: state.roles.map((role, index) => {
        if(index === action.index) {
          return {
            ...role,
            assigned: !role.assigned
          }
        } else {
          return role
        }
      })
    }

  default:
    return state

  }

}
