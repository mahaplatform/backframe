import model from 'platform/models/model'
import unique from 'platform/validations/unique'
import Member from './member'
import ExpenseType from './expense_type'

export default model.extend({

  tableName: 'expenses_projects',

  rules: {
    title: ['required', unique('expenses_projects', 'title')],
    code: ['required', unique('expenses_projects', 'code')]
  },

  members: function() {
    return this.hasMany(Member, 'project_id')
  },

  expense_types: function() {
    return this.belongsToMany(ExpenseType, 'expense_types')
  }

})
