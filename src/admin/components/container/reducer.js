import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  status: 'uninitialized',
  routes: {},
  data: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.FETCH_RESOURCE_REQUEST:
    return {
      ...state,
      status: 'loading',
      routes: {
        ...state.routes,
        [action.prop]: action.endpoint
      }
    }

  case actionTypes.FETCH_RESOURCE_SUCCESS:
    let data = {
      ...state.data,
      [action.prop]: (action.data.records) ? action.data.records : action.data
    }
    let status = _.isEqual(Object.keys(data).sort(), Object.keys(state.routes).sort()) ? 'loaded' : state.status
    return {
      ...state,
      data,
      status
    }

  case actionTypes.FETCH_RESOURCE_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.CLEAR_RESOURCE:
    return {
      ...state,
      routes: _.omit(state.routes, action.prop),
      data: _.omit(state.data, action.prop)
    }

  default:
    return state

  }
}
