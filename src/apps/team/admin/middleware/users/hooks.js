import Promise from 'bluebird'
import _ from 'lodash'

export const createRoles = (req, res, next) => {

  if(!req.body.role_ids) next()

  return req.resource.roles().attach(req.body.role_ids).then(roles => {

    next()

    return null

  }).catch(err => {

    if(err.errors) {
      const error = new Error({ code: 422, message: 'Unable to attach roles', data: err.toJSON() })
      return next(error)
    }

    next(err)

  })

}

export const updateRoles = (req, res, next) => {

  if(!req.body.role_ids === null) next()

  const roleIds = req.resource.related('roles').map(role => role.id)

  const removeIds = roleIds.reduce((ids, id) => {
    return !_.includes(req.body.role_ids, id) ? [...ids, id] : ids
  }, [])

  const addIds = req.body.role_ids.reduce((ids, id) => {
    return !_.includes(roleIds, id) ? [...ids, id] : ids
  }, [])

  let promises = []

  if(removeIds.length) promises.push(req.resource.roles().detach(removeIds))
  if(addIds.length) promises.push(req.resource.roles().attach(addIds))

  if(!promises.length) next()

  return Promise.all(promises).then(result => {

    next()

    return null

  }).catch(err => {

    if(err.errors) {
      const error = new Error({ code: 422, message: 'Unable to update roles', data: err.toJSON() })
      return next(error)
    }

    next(err)

  })

}
