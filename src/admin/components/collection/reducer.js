import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  params: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET_PARAMS:
    return {
      ...state,
      params: {
        filter: action.filter,
        sort: action.sort
      }
    }

  case actionTypes.FILTER:
    return {
      ...state,
      params: {
        ...state.params,
        filter: action.filter
      }
    }

  case actionTypes.SORT:
    return {
      ...state,
      params: {
        ...state.params,
        sort: {
          key: action.key,
          order: (state.params.sort.key == action.key && state.params.sort.order == 'asc') ? 'desc' : 'asc'
        }
      }
    }

  default:
    return state

  }

}
