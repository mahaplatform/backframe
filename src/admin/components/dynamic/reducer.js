import * as actionTypes from './action_types'

const INITIAL_STATE = {
  status: 'pending',
  records: [
    { id: 1, name: 'One', title: 'One' },
    { id: 2, name: 'Two', title: 'Two' },
    { id: 3, name: 'Three', title: 'Three' }
  ],
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
      records: [
        ...state.records,
        ...action.data.records
      ],
      loaded,
      total: action.data.total,
      status: (loaded === action.data.total) ? 'completed' : 'loaded'
    }

  default:
    return state
  }

}
