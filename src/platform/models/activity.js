import model from 'platform/models/model'
import App from 'platform/models/app'
import Story from 'platform/models/story'
import User from 'platform/models/user'

export default model.extend({

  tableName: 'activities',

  rules: {
    user_id: ['required']
  },

  app: function() {
    return this.belongsTo(App)
  },

  story: function() {
    return this.belongsTo(Story)
  },

  user: function() {
    return this.belongsTo(User)
  }

})
