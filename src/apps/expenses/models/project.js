import checkit from  'checkit'
import bookshelf from 'platform/services/bookshelf'
import unique from 'platform/validations/unique'
import member from './member'

export default bookshelf.Model.extend({

  tableName: 'expenses_projects',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('expenses_projects', 'title')],
    code: ['required', unique('expenses_projects', 'code')]
  },

  members: function() {
    return this.hasMany(member, 'project_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
