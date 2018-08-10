import bookshelf from '../services/bookshelf'
import checkit from  'checkit'

const Model = bookshelf.Model.extend({

  hasTimestamps: true,

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})

export default Model
