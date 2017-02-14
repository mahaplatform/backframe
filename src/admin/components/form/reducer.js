import * as actionTypes from './action_types'
import { validateForm } from './utils'

const INITIAL_STATE = {
  status: 'pending',
  sections: [],
  entity: {},
  data: {},
  errors: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET_SECTIONS:
    return {
      ...state,
      sections: action.sections,
      status: 'configured'
    }

  case actionTypes.FETCH_DATA_REQUEST:
    return {
      ...state,
      status: 'loading'
    }

  case actionTypes.FETCH_DATA_SUCCESS:
  case actionTypes.SET_DATA:
    return {
      ...state,
      status: 'ready',
      data: action.data
    }

  case actionTypes.FETCH_DATA_FAILURE:
    return {
      ...state,
      status: 'error',
      error: action.error
    }

  case actionTypes.UPDATE_DATA:
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      }
    }

  case actionTypes.VALIDATE_FORM:
    let error = validateForm(state.sections, state.data)
    return {
      ...state,
      message: error ? error.errors.message : null,
      errors: error ? error.errors : null,
      status: error ? 'validated' : state.status
    }

  case actionTypes.SUBMIT_REQUEST:
    return {
      ...state,
      status: 'submitting'
    }

  case actionTypes.SUBMIT_SUCCESS:
    return {
      ...state,
      status: 'success',
      entity: action.data
    }

  case actionTypes.SUBMIT_FAILURE:
    return {
      ...state,
      status: 'failure',
      errors: action.errors,
      message: action.meta.message
    }

  case actionTypes.RESET_FORM:
    return {
      ...INITIAL_STATE,
      status: 'ready',
      sections: state.sections,
      data: state.entity
    }

  default:
    return state

  }
}
