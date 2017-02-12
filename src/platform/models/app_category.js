import model from 'platform/models/model'
import unique from 'platform/validations/unique'
import App from 'platform/models/app'

export default model.extend({

  tableName: 'app_categories',

  rules: {
    title: ['required', unique('apps', 'title')]
  },

  apps: function() {
    return this.hasMany(App, 'app_category_id')
  }

})
