import Promise from 'bluebird'
import _ from 'lodash'

export const createRoles = (req, resource) => {

  return new Promise((resolve, reject) => {

    if(!req.body.role_ids) resolve(resource)

    return resource.roles().attach(req.body.role_ids).then(roles => {

      resolve(resource)

      return null

    }).catch(err => {

      if(err.errors) {
        return reject({ code: 422, message: 'Unable to create roles', data: err.toJSON() })
      }

      reject(err)

    })

  })

}

export const updateRoles = (req, resource) => {

  return new Promise((resolve, reject) => {

    if(!req.body.role_ids) resolve(resource)

    const roleIds = resource.related('roles').map(role => role.id)

    const removeIds = roleIds.reduce((ids, id) => {
      return !_.includes(req.body.role_ids, id) ? [...ids, id] : ids
    }, [])

    const addIds = req.body.role_ids.reduce((ids, id) => {
      return !_.includes(roleIds, id) ? [...ids, id] : ids
    }, [])

    let promises = []

    if(removeIds.length) promises.push(resource.roles().detach(removeIds))
    if(addIds.length) promises.push(resource.roles().attach(addIds))

    if(!promises.length) resolve(resource)

    return Promise.all(promises).then(result => {

      resolve(resource)

      return null

    }).catch(err => {

      if(err.errors) {

        return reject({ code: 422, message: 'Unable to update roles', data: err.toJSON() })

      }

      reject(err)

    })

  })

}
