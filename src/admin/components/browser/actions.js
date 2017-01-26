import * as actionTypes from './action_types'
import local from 'admin/utils/local'

export function loadPreferences() {
  return local.get({
    key: 'preferences',
    request: actionTypes.LOAD_PREFERENCES_REQUEST,
    success: actionTypes.LOAD_PREFERENCES_SUCCESS,
    failure: actionTypes.LOAD_PREFERENCES_FAILURE
  })
}

export function savePreferences(value) {
  return local.set({
    key: 'preferences',
    value,
    request: actionTypes.SAVE_PREFERENCES_REQUEST,
    success: actionTypes.SAVE_PREFERENCES_SUCCESS,
    failure: actionTypes.SAVE_PREFERENCES_FAILURE
  })
}

export function setPreference(key, value) {
  return {
    type: actionTypes.SET_PREFERENCE,
    key,
    value
  }
}
