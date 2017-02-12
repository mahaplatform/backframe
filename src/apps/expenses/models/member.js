import model from 'platform/models/model'
import project from './project'
import user from 'platform/models/user'

export default model.extend({

  tableName: 'expenses_members',

  rules: {
    user_id: ['required'],
    project_id: ['required']
  },

  project: function() {
    return this.belongsTo(project, 'project_id')
  },

  user: function() {
    return this.belongsTo(user, 'user_id')
  }

})
