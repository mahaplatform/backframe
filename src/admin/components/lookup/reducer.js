import * as actionTypes from './action_types'

const INITIAL_VALUE = {
  active: false,
  selected: null,
  query: '',
  results: [],
  status: 'ready'
}

export default (state = INITIAL_VALUE, action) => {

  switch (action.type) {

  case actionTypes.BEGIN:
    return {
      ...state,
      active: true
    }

  case actionTypes.CANCEL:
    return {
      ...state,
      active: false
    }

  case actionTypes.CHOOSE:
    return {
      ...state,
      active: false,
      selected: action.index
    }

  case actionTypes.LOOKUP_REQUEST:
    return {
      ...state,
      query: action.params.q
    }

  case actionTypes.LOOKUP_SUCCESS:
    return {
      ...state,
      status: 'success',
      results: action.data.records
    }

  case actionTypes.LOOKUP_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state

  }

}
