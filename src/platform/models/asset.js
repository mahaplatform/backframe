import model from 'platform/models/model'
import unique from 'platform/validations/unique'

export default model.extend({

  tableName: 'assets',

  rules: {
    fingerprint: [unique('assets', 'fingerprint')]
  },

  virtuals: {
    url: function() {
      return (!this.isNew()) ? `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/assets/${this.get('id')}/${this.get('file_name')}` : null
    }
  }

})
