import model from './model'
import Ticket from 'app/models/ticket'

export default model.extend({

  tableName: 'users',

  rules: {
    name: 'required',
    email: 'required'
  },

  tickets: function() {
    return this.hasMany(Ticket)
  }

})
