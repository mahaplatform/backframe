import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function approve(id) {
  return api.patch({
    endpoint: `/admin/expenses/approvals/${id}/approve`,
    request: actionTypes.APPROVE_REQUEST,
    success: actionTypes.APPROVE_SUCCESS,
    failure: actionTypes.APPROVE_FAILURE
  })
}

export function reject(id) {
  return api.patch({
    endpoint: `/admin/expenses/approvals/${id}/reject`,
    request: actionTypes.REJECT_REQUEST,
    success: actionTypes.REJECT_SUCCESS,
    failure: actionTypes.REJECT_FAILURE
  })
}
