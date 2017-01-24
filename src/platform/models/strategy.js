import model from 'platform/models/model'
import Team from 'platform/models/team'

export default model.extend({

  tableName: 'strategies',

  team: function() {
    return this.belongsTo(Team, 'team_id')
  }

})
