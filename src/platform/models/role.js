import model from 'platform/models/model'
import App from 'platform/models/app'
import Right from 'platform/models/right'
import User from 'platform/models/user'

export default model.extend({

  tableName: 'roles',

  rules: {
    text: 'required'
  },

  apps: function() {
    return this.belongsToMany(App, 'roles_apps', 'role_id', 'app_id')
  },

  rights: function() {
    return this.belongsToMany(Right, 'roles_rights', 'role_id', 'right_id')
  },

  users: function() {
    return this.belongsToMany(User, 'users_roles', 'role_id', 'user_id')
  }

})
