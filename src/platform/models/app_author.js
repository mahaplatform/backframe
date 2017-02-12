import model from 'platform/models/model'
import unique from 'platform/validations/unique'
import App from 'platform/models/app'

export default model.extend({

    tableName: 'app_authors',

    rules: {
        title: ['required', unique('apps', 'name')]
    },

    apps: function() {
        return this.hasMany(App, 'app_author_id')
    }

})
