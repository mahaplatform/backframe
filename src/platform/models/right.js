import model from 'platform/models/model'
import App from 'platform/models/app'
import Role from 'platform/models/role'

export default model.extend({

    tableName: 'rights',

    rules: {
        text: 'required',
        app_id: 'required'
    },

    app: function() {
        return this.belongsTo(App, 'app_id')
    },

    roles: function() {
        return this.belongsToMany(Role, 'users_roles', 'user_id', 'role_id')
    }

})
