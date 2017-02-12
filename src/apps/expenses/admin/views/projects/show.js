import React from 'react'
import Card from 'admin/components/card'
import Page from 'admin/components/page'
import Edit from './edit'
import Member from './member'

class Show extends React.Component {

  render() {
    const { members } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Card {...this._getCard()} />
        </div>
        <div className="chrome-content">
          <div className="project-members">
            <h2>Members</h2>
            {members.map((member, index) => {
              return (
                <div key={`member_${index}`} className="project-member" to={`/admin/expenses/projects/${member.project_id}/members/${member.id}`}>
                  <img src={ member.user.photo.url } className="ui circular image" title={ member.user.full_name } />
                  <p>
                    <strong>{member.user.full_name}</strong><br />
                    {member.user.email}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  _getCard() {
    const { project } = this.props
    return {
      items: [
        { label: 'Title ', content: project.title },
        { label: 'Code ', content: project.code, format: 'code' },
        { label: 'Created ', content: project.created_at, format: 'datetime' }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Project',
  rights: [],
  tasks: [
    { label: 'Edit Project', modal: Edit },
    { label: 'Add Member', modal: Member }
  ],
  resources: {
    project: `/admin/expenses/projects/${props.params.id}`,
    members: `/admin/expenses/projects/${props.params.id}/members`
  }
})

export default Page(mapPropsToPage)(Show)
