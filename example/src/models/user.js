import model from './model'

const User = model.extend({

  tableName: 'maha_users',

  rules: {
    'first_name': ['required'],
    'last_name': ['required'],
    'email': ['required', 'email']
  },

  virtuals: {}

})

export default User
