import checkit from  'checkit'
import bookshelf from 'platform/services/bookshelf'
import ExpenseType from  './expense_type'
import Project from  './project'
import User from  'platform/models/user'
import Vendor from  './vendor'

export default bookshelf.Model.extend({

  tableName: 'expenses_expenses',

  hasTimestamps: ['created_at', 'updated_at'],

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
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
