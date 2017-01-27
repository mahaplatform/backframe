import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  status: 'pending',
  roles: [],
  assigned: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET_ASSIGNED:
    return {
      ...state,
      assigned: action.assigned
    }

  case actionTypes.LOAD_SUCCESS:
    return {
      ...state,
      roles: action.data.records
    }

  case actionTypes.TOGGLE:
    return {
      ...state,
      assigned: _.includes(state.assigned, state.roles[action.index].id) ? _.without(state.assigned, state.roles[action.index].id) : [...state.assigned, state.roles[action.index].id]
    }

  default:
    return state

  }

}
