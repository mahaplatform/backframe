import model from './model'
import User from 'app/models/user'

export default model.extend({

  tableName: 'tickets',

  rules: {
    text: 'required'
  },

  user: function() {
    return this.belongsTo(User)
  }

})
