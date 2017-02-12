import checkit from  'checkit'
import bookshelf from 'platform/services/bookshelf'
import unique from 'platform/validations/unique'

export default bookshelf.Model.extend({

  tableName: 'expenses_expense_types',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('users', 'email')],
    code: ['required', unique('users', 'email')]
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
