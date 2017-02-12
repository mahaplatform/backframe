import model from 'platform/models/model'
import Team from 'platform/models/team'
import App from 'platform/models/app'

export default model.extend({

  tableName: 'installations',

  rules: {
    app_id: 'required',
    intance_id: 'required'
  },

  team: function() {
    return this.belongsTo(Team, 'team_id')
  },

  app: function() {
    return this.belongsTo(App, 'app_id')
  }

})
