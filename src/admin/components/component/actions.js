import * as actionTypes from './action_types'

export const add = (namespace, tid, cid) => {
  return {
    type: actionTypes.ADD,
    namespace,
    tid,
    cid
  }
}

export const remove = (namespace, tid, cid) => {
  return {
    type: actionTypes.REMOVE,
    namespace,
    tid,
    cid
  }
}
