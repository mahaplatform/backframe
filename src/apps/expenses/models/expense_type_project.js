import model from 'platform/models/model'
import Project from './project'
import ExpenseType from './expense_type'

export default model.extend({

  tableName: 'expenses_expense_types_projects',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    expense_type_id: ['required'],
    project_id: ['required']
  },

  expense_type: function() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  project: function() {
    return this.belongsTo(Project, 'project_id')
  }

})
