import model from 'platform/models/model'
import unique from 'platform/validations/unique'

export default model.extend({

  tableName: 'expenses_expense_types',

  rules: {
    title: ['required', unique('users', 'email')],
    code: ['required', unique('users', 'email')]
  }

})
