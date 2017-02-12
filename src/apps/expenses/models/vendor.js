import model from 'platform/models/model'
import unique from 'platform/validations/unique'

export default model.extend({

  tableName: 'expenses_vendors',

  rules: {
    name: ['required', unique('vendors', 'name')]
  }

})
