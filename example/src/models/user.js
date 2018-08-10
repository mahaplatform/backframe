import model from './model'
import Asset from './asset'

const User = model.extend({

  tableName: 'maha_users',

  rules: {
    'first_name': ['required'],
    'last_name': ['required'],
    'email': ['required', 'email']
  },

  virtuals: {},

  photo: function() {
    return this.belongsTo(Asset, 'photo_id')
  }

})

export default User
