import React from 'react'
import Form from 'admin/components/form'

class Member extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Add Member',
      method: 'post',
      action: `/admin/expenses/projects/${this.context.container.params.id}/members`,
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'User', name: 'user_id', type: 'select', placeholder: 'User', endpoint: '/admin/team/users', value: 'id', text: 'full_name' }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('members')
    this.context.modal.pop()
  }

}

export default Member
