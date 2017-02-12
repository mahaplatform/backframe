import checkit from  'checkit'
import bookshelf from 'platform/services/bookshelf'
import project from './project'
import user from 'platform/models/user'

export default bookshelf.Model.extend({

  tableName: 'expenses_members',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    user_id: ['required'],
    project_id: ['required']
  },

  project: function() {
    return this.belongsTo(project, 'project_id')
  },

  user: function() {
    return this.belongsTo(user, 'user_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
