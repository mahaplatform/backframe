import model from 'platform/models/model'
import ExpenseType from  './expense_type'
import Project from  './project'
import User from 'platform/models/user'

export default model.extend({

  tableName: 'expenses_trips',

  rules: {
    project_id: ['required'],
    date: ['required'],
    description: ['required'],
    time_leaving: ['required'],
    time_arriving: ['required'],
    odometer_start: ['required'],
    odometer_end: ['required']
  },

  approved_by: function() {
    return this.belongsTo(User, 'approved_by_id')
  },

  expense_type: function() {
    return this.belongsTo(ExpenseType, 'expense_type_id')
  },

  project: function() {
    return this.belongsTo(Project, 'project_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  }

})
