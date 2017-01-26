import * as actionTypes from './action_types'

const INITIAL_STATE = {
  all: 0,
  status: 'pending',
  records: [],
  loaded: 0,
  total: 0
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return INITIAL_STATE

  case actionTypes.FETCH_REQUEST:
    return {
      ...state,
      records: (action.params['$skip'] > 0) ? state.records : [],
      status: 'loading'
    }

  case actionTypes.FETCH_SUCCESS:
    const loaded = state.records.length + action.data.records.length
    return {
      ...state,
      all: action.data.all,
      records: [
        ...state.records,
        ...action.data.records
      ],
      loaded,
      total: action.data.total,
      status: (loaded >= action.data.total) ? 'completed' : 'loaded'
    }

  case actionTypes.FETCH_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}
