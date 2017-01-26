import * as actionTypes from './action_types'

export function addFile(uniqueIdentifier, fileName, fileSize, contentType, totalChunks) {
  return {
    type: actionTypes.ADD_FILE,
    uniqueIdentifier,
    fileName,
    fileSize,
    contentType,
    totalChunks
  }
}

export function uploadBegin() {
  return {
    type: actionTypes.UPLOAD_BEGIN
  }
}

export function uploadProgress(uniqueIdentifier, progress) {
  return {
    type: actionTypes.UPLOAD_PROGRESS,
    uniqueIdentifier,
    progress
  }
}

export function uploadSuccess(uniqueIdentifier) {
  return {
    type: actionTypes.UPLOAD_SUCCESS,
    uniqueIdentifier
  }
}

export function uploadFailure() {
  return {
    type: actionTypes.UPLOAD_FAILURE
  }
}

export function removeFile(uniqueIdentifier) {
  return {
    type: actionTypes.REMOVE_FILE,
    uniqueIdentifier
  }
}

export function uploadComplete() {
  return {
    type: actionTypes.UPLOAD_COMPLETE
  }
}
