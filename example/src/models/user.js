import bookshelf from '../services/bookshelf'
import Checkit from  'checkit'
import _ from 'lodash'

const User = bookshelf.Model.extend({

  hasTimestamps: true,

  tableName: 'maha_users',

  rules: {},

  virtuals: {}

})

export default User
