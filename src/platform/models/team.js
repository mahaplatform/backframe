import model from 'platform/models/model'
import Asset from 'platform/models/asset'
import Strategy from 'platform/models/strategy'

export default model.extend({

  tableName: 'teams',

  rules: {
    title: 'required'
  },

  logo: function() {
    return this.belongsTo(Asset, 'logo_id')
  },

  strategies: function() {
    return this.hasMany(Strategy, 'team_id')
  }

})
