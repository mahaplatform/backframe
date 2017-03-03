import model from 'platform/models/model'

export default model.extend({

  tableName: 'expenses_expense_types',

  rules: {
    title: 'required',
    code: 'required'
  },

  virtuals: {
    activity: function() {
      return {
        type: 'expense type',
        text: this.get('title')
      }
    },
    text: function() {
      return this.get('code') + ' - ' + this.get('title')
    }
  }

})
