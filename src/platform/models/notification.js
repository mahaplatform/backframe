import model from 'platform/models/model'
import Story from 'platform/models/story'
import User from 'platform/models/user'

export default model.extend({

    tableName: 'notifications',

    rules: {
        user_id: ['required']
    },

    story: function() {
        return this.belongsTo(Story)
    },

    user: function() {
        return this.belongsTo(User)
    }

})
