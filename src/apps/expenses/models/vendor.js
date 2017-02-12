import checkit from  'checkit'
import bookshelf from 'platform/services/bookshelf'
import unique from 'platform/validations/unique'

export default bookshelf.Model.extend({

  tableName: 'expenses_vendors',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    name: ['required', unique('vendors', 'name')]
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
