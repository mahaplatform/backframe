import model from 'platform/models/model'
import bcrypt from 'bcrypt-nodejs'
import unique from 'platform/validations/unique'
import Asset from 'platform/models/asset'
import Role from 'platform/models/role'
import SecurityQuestion from 'platform/models/security_question'
import Team from 'platform/models/team'

export default model.extend({

    tableName: 'users',

    rules: {
        first_name: 'required',
        last_name: 'required',
        email: ['required', 'email', unique('users', 'email')]
    },

    photo: function() {
        return this.belongsTo(Asset, 'photo_id')
    },

    security_question_1: function() {
        return this.belongsTo(SecurityQuestion, 'security_question_1_id')
    },

    security_question_2: function() {
        return this.belongsTo(SecurityQuestion, 'security_question_2_id')
    },

    roles: function() {
        return this.belongsToMany(Role, 'users_roles', 'user_id', 'role_id')
    },

    team: function() {
        return this.belongsTo(Team, 'team_id')
    },

    virtuals: {

        full_name: function() {
            return this.get('first_name') + ' ' + this.get('last_name')
        },

        initials: function() {
            const first_name = this.get('first_name') || ''
            const last_name = this.get('last_name') || ''
            return first_name[0] + last_name[0]
        },

        password: {
            get: function() {},
            set: function(value) {
                const password_salt = bcrypt.genSaltSync(10)
                this.set('password_salt', password_salt)
                this.set('password_hash', bcrypt.hashSync(value, password_salt))
            }
        }

    },

    authenticate: function(password) {
        return this.get('password_hash') === bcrypt.hashSync(password, this.get('password_salt'))
    }

})
