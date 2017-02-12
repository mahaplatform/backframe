import model from 'platform/models/model'

export default model.extend({

    tableName: 'stories',

    rules: {
        text: 'required'
    }

})
