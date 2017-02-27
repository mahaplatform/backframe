import model from 'platform/models/model'
import Approval from  './approval'
import ExpenseType from  './expense_type'
import Project from  './project'
import User from  'platform/models/user'
import Vendor from  './vendor'

export default model.extend({

  tableName: 'expenses_expenses',

  rules: {
    date: ['required'],
    project_id: ['required'],
    expense_type_id: ['required'],
    vendor_id: ['required'],
    description: ['required'],
    amount: ['required']
  },

  virtuals: {
    activity: function() {
      return {
        type: 'expense',
        text: this.get('description')
      }
    }
  },

  approval: function() {
    return this.morphOne(Approval, 'owner')
  },

  expense_type: function() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  project: function() {
    return this.belongsTo(Project, 'project_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  },

  vendor: function() {
    return this.belongsTo(Vendor, 'vendor_id')
  }

})
