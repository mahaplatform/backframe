import model from 'platform/models/model'
import member from './member'

export default model.extend({

  tableName: 'expenses_member_types',

  members: function() {
    return this.hasMany(member, 'member_type_id')
  }

})
