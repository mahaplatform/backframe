import model from 'platform/models/model'
import unique from 'platform/validations/unique'

export default model.extend({

  tableName: 'assets',

  rules: {
    fingerprint: [unique('assets', 'fingerprint')]
  },

  virtuals: {
    url: function() {
      return `/images/${this.get('file_name')}`
    }
  }

})
