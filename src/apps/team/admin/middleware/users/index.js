import knex from 'platform/services/knex'
import resources from 'platform/middleware/resources'
import User from 'platform/models/user'
import UserSerializer from 'platform/serializers/user_serializer'
import { createRoles, updateRoles } from './hooks'
import accessHandler from '../access/user.js'

export default resources({
  actions: {
    access: {
      on: 'member',
      path: 'access',
      method: 'get',
      handler: accessHandler
    }
  },
  after: {
    create: createRoles,
    update: updateRoles
  },
  allowedParams: ['first_name','last_name','email'],
  filterParams: ['role_id'],
  defaultSort: 'last_name',
  model: User,
  name: 'user',
  query: (qb, req, filters) => {
    qb.select(knex.raw('distinct on ("users"."id","users"."last_name") "users".*'))
    qb.innerJoin('users_roles', 'users_roles.user_id', 'users.id')
  },
  serializer: UserSerializer,
  searchParams: ['first_name','last_name','email'],
  sortParams: ['last_name'],
  withRelated: ['photo','roles']
})
