import model from 'platform/models/model'
import Advance from './advance'
import Expense from './expense'
import Trip from './trip'
import User from  'platform/models/user'

export default model.extend({

  tableName: 'expenses_approvals',

  rules: {
  },

  owner: function() {
    return this.morphTo('owner', Advance, Expense, Trip)
  },

  approved_by: function() {
    return this.belongsTo(User, 'approved_by_id')
  }

})
