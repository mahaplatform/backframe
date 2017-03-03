import Member from '../../../models/member'

export const createProcessor = req => {

  return Member.where({ project_id: req.params.project_id, user_id: req.body.user_id }).fetch().then(member => {

    if(member) return member

    const data = {
      team_id: req.team.get('id'),
      project_id: req.params.project_id,
      user_id: req.body.user_id,
      member_type_id: req.body.member_type_id
    }

    return Member.forge(data).save().catch(err => {

      if(err.errors) throw({ code: 422, message: 'Unable to create member', errors: err.toJSON() })

      throw(err)

    })

  })

}
