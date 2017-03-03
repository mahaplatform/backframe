import model from 'platform/models/model'
import member_type from './member_type'
import project from './project'
import user from 'platform/models/user'

export default model.extend({

  tableName: 'expenses_members',

  rules: {
    user_id: ['required'],
    project_id: ['required']
  },

  virtuals: {
    activity: function() {
      return {
        type: 'member',
        text: this.related('user').get('full_name')
      }
    }
  },

  member_type: function() {
    return this.belongsTo(member_type, 'member_type_id')
  },

  project: function() {
    return this.belongsTo(project, 'project_id')
  },

  user: function() {
    return this.belongsTo(user, 'user_id')
  }

})
