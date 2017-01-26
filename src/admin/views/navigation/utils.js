import _ from 'lodash'

export const userHasRights = (user, rights) => {
  return rights.reduce((permit, right) => {
    return (!_.includes(user.rights, right)) ? false : permit
  }, true)
}
