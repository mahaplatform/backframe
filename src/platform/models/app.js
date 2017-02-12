import model from 'platform/models/model'
import unique from 'platform/validations/unique'
import Author from 'platform/models/app_author'
import Category from 'platform/models/app_category'
import Role from 'platform/models/role'
import User from 'platform/models/user'

export default model.extend({

    tableName: 'apps',

    rules: {
        title: ['required', unique('apps', 'title')]
    },

    author: function() {
        return this.belongsTo(Author, 'app_author_id')
    },

    category: function() {
        return this.belongsTo(Category, 'app_category_id')
    },

    users: function() {
        return this.belongsToMany(User, 'users_apps', 'app_id', 'user_id')
    },

    roles: function() {
        return this.belongsToMany(Role, 'roles_apps', 'role_id', 'app_id')
    }

})
