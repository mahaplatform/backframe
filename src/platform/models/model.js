import bookshelf from 'platform/services/bookshelf'
import checkit from  'checkit'

export default bookshelf.Model.extend({

    hasTimestamps: ['created_at', 'updated_at'],

    initialize: function(attrs, opts) {
        this.on('saving', this.validateSave)
    },

    validateSave: function() {
        return new checkit(this.rules).run(this.attributes)
    }

})
