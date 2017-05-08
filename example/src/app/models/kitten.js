import bookshelf from '../../services/bookshelf'
import checkit from  'checkit'

export default bookshelf.Model.extend({

  tableName: 'kittens',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
      name: 'required',
      age: 'required'
  },


  initialize: function(attrs, opts) {
      this.on('saving', this.validateSave)
  },

  validateSave: function() {
      return new checkit(this.rules).run(this.attributes)
  }

})
