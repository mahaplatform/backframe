import checkit from  'checkit'
import bookshelf from 'platform/services/bookshelf'
import unique from 'platform/validations/unique'
import Member from './member'
import ExpenseType from './expense_type'

export default bookshelf.Model.extend({

  tableName: 'expenses_projects',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('expenses_projects', 'title')],
    code: ['required', unique('expenses_projects', 'code')]
  },

  members: function() {
    return this.hasMany(Member, 'project_id')
  },

  expense_types: function() {
    return this.belongsToMany(ExpenseType, 'expense_types')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
