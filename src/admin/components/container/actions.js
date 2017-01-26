// @flow

import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export const fetchResource = (prop, endpoint) => {
  return api.get({
    endpoint,
    meta: { prop, endpoint },
    request: actionTypes.FETCH_RESOURCE_REQUEST,
    success: actionTypes.FETCH_RESOURCE_SUCCESS,
    failure: actionTypes.FETCH_RESOURCE_FAILURE
  })
}

export function clearResource(prop) {
  return {
    type: actionTypes.CLEAR_RESOURCE,
    prop
  }
}
