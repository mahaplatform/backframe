import model from 'platform/models/model'
import unique from 'platform/validations/unique'

export default model.extend({

  tableName: 'expenses_vendors',

  rules: {
    name: ['required', unique('expenses_vendors', 'name')]
  },

  virtuals: {
    activity: function() {
      return {
        type: 'vendor',
        text: this.get('name')
      }
    }
  }

})
