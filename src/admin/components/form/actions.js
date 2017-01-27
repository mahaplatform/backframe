import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export const setSections = (sections) => ({
  type: actionTypes.SET_SECTIONS,
  sections
})

export function fetchData(cid, endpoint) {
  return api.get({
    endpoint,
    meta: { cid },
    request: actionTypes.FETCH_DATA_REQUEST,
    success: actionTypes.FETCH_DATA_SUCCESS,
    failure: actionTypes.FETCH_DATA_FAILURE
  })
}

export const setData = (data) => ({
  type: actionTypes.SET_DATA,
  data
})

export const setReady = () => ({
  type: actionTypes.SET_READY
})

export const updateData = (key, value) => ({
  type: actionTypes.UPDATE_DATA,
  key,
  value
})

export const submitForm = (cid, method, endpoint, params) => {
  return api.request({
    method,
    params,
    endpoint,
    meta: { cid },
    request: actionTypes.SUBMIT_REQUEST,
    success: actionTypes.SUBMIT_SUCCESS,
    failure: actionTypes.SUBMIT_FAILURE
  })
}
