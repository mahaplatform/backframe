import model from 'platform/models/model'

export default model.extend({

  tableName: 'security_questions',

  rules: {
    text: ['required']
  }

})
